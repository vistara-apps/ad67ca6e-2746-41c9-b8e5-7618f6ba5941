import { NextRequest, NextResponse } from 'next/server';
import { mockLegalAidOrgs, getLegalAidOrgsByJurisdiction } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jurisdiction = searchParams.get('jurisdiction');

    let orgs = mockLegalAidOrgs;

    // Apply jurisdiction filter
    if (jurisdiction) {
      orgs = await getLegalAidOrgsByJurisdiction(jurisdiction);
    }

    return NextResponse.json({
      organizations: orgs,
      total: orgs.length,
      filters: {
        jurisdiction
      }
    });
  } catch (error) {
    console.error('Error fetching legal aid organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal aid organizations' },
      { status: 500 }
    );
  }
}
