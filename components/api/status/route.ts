import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.warm.lat/bot/status', {
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch status');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bot status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bot status' },
      { status: 500 }
    );
  }
}
