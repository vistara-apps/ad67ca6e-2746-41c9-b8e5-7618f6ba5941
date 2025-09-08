import { NextRequest, NextResponse } from 'next/server';
import { getRightsCardById } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;
    const card = await getRightsCardById(cardId);

    if (!card) {
      return NextResponse.json(
        { error: 'Rights card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ card });
  } catch (error) {
    console.error('Error fetching rights card:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rights card' },
      { status: 500 }
    );
  }
}
