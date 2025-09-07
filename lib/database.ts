import { createClient } from '@supabase/supabase-js';
import { RightsCard, Script, LegalAidOrg, User } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// User operations
export async function createUser(userData: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    
    return {
      userId: data.id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      farcasterId: data.farcaster_id,
      walletAddress: data.wallet_address
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    
    return {
      userId: data.id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      farcasterId: data.farcaster_id,
      walletAddress: data.wallet_address
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Rights Card operations
export async function getRightsCards(filters?: {
  scenario?: string;
  jurisdiction?: string;
  language?: string;
  limit?: number;
}): Promise<RightsCard[]> {
  try {
    let query = supabase
      .from('rights_cards')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.scenario) {
      query = query.eq('scenario', filters.scenario);
    }
    if (filters?.jurisdiction) {
      query = query.eq('jurisdiction', filters.jurisdiction);
    }
    if (filters?.language) {
      query = query.eq('language', filters.language);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(card => ({
      cardId: card.id,
      title: card.title,
      scenario: card.scenario,
      jurisdiction: card.jurisdiction,
      language: card.language,
      content: card.content,
      pdfUrl: card.pdf_url,
      shareableLink: card.shareable_link,
      offlineAccessEnabled: card.offline_access_enabled,
      createdAt: new Date(card.created_at),
      updatedAt: new Date(card.updated_at)
    }));
  } catch (error) {
    console.error('Error fetching rights cards:', error);
    return [];
  }
}

export async function getRightsCardById(cardId: string): Promise<RightsCard | null> {
  try {
    const { data, error } = await supabase
      .from('rights_cards')
      .select('*')
      .eq('id', cardId)
      .single();

    if (error) throw error;

    return {
      cardId: data.id,
      title: data.title,
      scenario: data.scenario,
      jurisdiction: data.jurisdiction,
      language: data.language,
      content: data.content,
      pdfUrl: data.pdf_url,
      shareableLink: data.shareable_link,
      offlineAccessEnabled: data.offline_access_enabled,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  } catch (error) {
    console.error('Error fetching rights card:', error);
    return null;
  }
}

export async function createRightsCard(cardData: Omit<RightsCard, 'cardId' | 'createdAt' | 'updatedAt'>): Promise<RightsCard | null> {
  try {
    const { data, error } = await supabase
      .from('rights_cards')
      .insert([{
        title: cardData.title,
        scenario: cardData.scenario,
        jurisdiction: cardData.jurisdiction,
        language: cardData.language,
        content: cardData.content,
        pdf_url: cardData.pdfUrl,
        shareable_link: cardData.shareableLink,
        offline_access_enabled: cardData.offlineAccessEnabled,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      cardId: data.id,
      title: data.title,
      scenario: data.scenario,
      jurisdiction: data.jurisdiction,
      language: data.language,
      content: data.content,
      pdfUrl: data.pdf_url,
      shareableLink: data.shareable_link,
      offlineAccessEnabled: data.offline_access_enabled,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  } catch (error) {
    console.error('Error creating rights card:', error);
    return null;
  }
}

// Script operations
export async function createScript(scriptData: Omit<Script, 'scriptId' | 'createdAt'>): Promise<Script | null> {
  try {
    const { data, error } = await supabase
      .from('scripts')
      .insert([{
        card_id: scriptData.cardId,
        scenario: scriptData.scenario,
        type: scriptData.type,
        content: scriptData.content,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      scriptId: data.id,
      cardId: data.card_id,
      scenario: data.scenario,
      type: data.type,
      content: data.content,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error creating script:', error);
    return null;
  }
}

export async function getScriptsByCardId(cardId: string): Promise<Script[]> {
  try {
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('card_id', cardId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(script => ({
      scriptId: script.id,
      cardId: script.card_id,
      scenario: script.scenario,
      type: script.type,
      content: script.content,
      createdAt: new Date(script.created_at)
    }));
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return [];
  }
}

// Legal Aid Organization operations
export async function getLegalAidOrgs(jurisdiction?: string): Promise<LegalAidOrg[]> {
  try {
    let query = supabase
      .from('legal_aid_orgs')
      .select('*')
      .order('name');

    if (jurisdiction) {
      query = query.eq('jurisdiction', jurisdiction);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(org => ({
      orgId: org.id,
      name: org.name,
      contactInfo: org.contact_info,
      jurisdiction: org.jurisdiction,
      website: org.website
    }));
  } catch (error) {
    console.error('Error fetching legal aid organizations:', error);
    return [];
  }
}

export async function createLegalAidOrg(orgData: Omit<LegalAidOrg, 'orgId'>): Promise<LegalAidOrg | null> {
  try {
    const { data, error } = await supabase
      .from('legal_aid_orgs')
      .insert([{
        name: orgData.name,
        contact_info: orgData.contactInfo,
        jurisdiction: orgData.jurisdiction,
        website: orgData.website
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      orgId: data.id,
      name: data.name,
      contactInfo: data.contact_info,
      jurisdiction: data.jurisdiction,
      website: data.website
    };
  } catch (error) {
    console.error('Error creating legal aid organization:', error);
    return null;
  }
}

// Search functionality
export async function searchRightsCards(query: string, filters?: {
  jurisdiction?: string;
  language?: string;
}): Promise<RightsCard[]> {
  try {
    let dbQuery = supabase
      .from('rights_cards')
      .select('*')
      .or(`title.ilike.%${query}%,scenario.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (filters?.jurisdiction) {
      dbQuery = dbQuery.eq('jurisdiction', filters.jurisdiction);
    }
    if (filters?.language) {
      dbQuery = dbQuery.eq('language', filters.language);
    }

    const { data, error } = await dbQuery;

    if (error) throw error;

    return data.map(card => ({
      cardId: card.id,
      title: card.title,
      scenario: card.scenario,
      jurisdiction: card.jurisdiction,
      language: card.language,
      content: card.content,
      pdfUrl: card.pdf_url,
      shareableLink: card.shareable_link,
      offlineAccessEnabled: card.offline_access_enabled,
      createdAt: new Date(card.created_at),
      updatedAt: new Date(card.updated_at)
    }));
  } catch (error) {
    console.error('Error searching rights cards:', error);
    return [];
  }
}

// Analytics and usage tracking
export async function trackCardView(cardId: string, userId?: string): Promise<void> {
  try {
    await supabase
      .from('card_views')
      .insert([{
        card_id: cardId,
        user_id: userId,
        viewed_at: new Date().toISOString()
      }]);
  } catch (error) {
    console.error('Error tracking card view:', error);
  }
}

export async function trackScriptGeneration(cardId: string, scriptType: string, userId?: string): Promise<void> {
  try {
    await supabase
      .from('script_generations')
      .insert([{
        card_id: cardId,
        script_type: scriptType,
        user_id: userId,
        generated_at: new Date().toISOString()
      }]);
  } catch (error) {
    console.error('Error tracking script generation:', error);
  }
}

// Offline sync functionality
export async function getOfflineData(): Promise<{
  cards: RightsCard[];
  legalAidOrgs: LegalAidOrg[];
}> {
  try {
    const [cardsResponse, orgsResponse] = await Promise.all([
      supabase
        .from('rights_cards')
        .select('*')
        .eq('offline_access_enabled', true),
      supabase
        .from('legal_aid_orgs')
        .select('*')
    ]);

    const cards = cardsResponse.data?.map(card => ({
      cardId: card.id,
      title: card.title,
      scenario: card.scenario,
      jurisdiction: card.jurisdiction,
      language: card.language,
      content: card.content,
      pdfUrl: card.pdf_url,
      shareableLink: card.shareable_link,
      offlineAccessEnabled: card.offline_access_enabled,
      createdAt: new Date(card.created_at),
      updatedAt: new Date(card.updated_at)
    })) || [];

    const legalAidOrgs = orgsResponse.data?.map(org => ({
      orgId: org.id,
      name: org.name,
      contactInfo: org.contact_info,
      jurisdiction: org.jurisdiction,
      website: org.website
    })) || [];

    return { cards, legalAidOrgs };
  } catch (error) {
    console.error('Error fetching offline data:', error);
    return { cards: [], legalAidOrgs: [] };
  }
}
