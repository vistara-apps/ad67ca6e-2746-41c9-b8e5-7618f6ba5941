import { NextRequest, NextResponse } from 'next/server';
import { mockRightsCards, getRightsCardsByScenario, searchRightsCards } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario');
    const jurisdiction = searchParams.get('jurisdiction');
    const language = searchParams.get('language');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let cards = mockRightsCards;

    // Apply search filter
    if (search) {
      cards = await searchRightsCards(search);
    }

    // Apply scenario filter
    if (scenario) {
      cards = cards.filter(card => card.scenario === scenario);
    }

    // Apply jurisdiction filter
    if (jurisdiction) {
      cards = cards.filter(card => card.jurisdiction === jurisdiction);
    }

    // Apply language filter
    if (language) {
      cards = cards.filter(card => card.language === language);
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10);
      cards = cards.slice(0, limitNum);
    }

    return NextResponse.json({
      cards,
      total: cards.length,
      filters: {
        scenario,
        jurisdiction,
        language,
        search,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching rights cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rights cards' },
      { status: 500 }
    );
  }
}
