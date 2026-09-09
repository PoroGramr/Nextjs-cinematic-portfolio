import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';

async function isAdmin() {
  const store = await cookies();
  const token = store.get('admin_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch { return false; }
}

export async function GET(request) {
  if (!supabase) return NextResponse.json(null);
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  let query = supabase.from('settings').select('*');
  if (key) query = query.eq('key', key).single();
  const { data } = await query;
  return NextResponse.json(data || null);
}

export async function PATCH(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  }
  const { key, value } = await request.json();
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key, value }, { onConflict: 'key' })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
