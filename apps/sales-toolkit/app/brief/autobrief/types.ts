export interface Source {
    title: string;
    publisher: string;
    url: string;
    date: string; // YYYY-MM-DD
}

export interface CompanyProfile {
    overview: {
        company_name: string;
        founded: string;
        headquarters: string;
        industry: string;
        employee_count: string | number;
        mission_statement: string;
        business_model: string;
        sources: Source[];
    };
    key_executives: Array<{
        name: string;
        position: string;
        background: string;
        source: Source;
    }>;
    financials: {
        revenue: string;
        funding: string;
        valuation: string;
        profitability: string;
        sources: Source[];
    };
    recent_news: Array<{
        headline: string;
        date: string; // YYYY-MM-DD
        summary: string;
        source: Source;
        impact: string;
    }>;
}

export interface ProductsServices {
    core_offerings: Array<{
        name: string;
        description: string;
        features: string[];
        target_audience: string;
        launch_date: string;
        source: Source;
    }>;
    target_segments: Array<{
        segment_name: string;
        description: string;
        size: string;
        growth_rate: string;
        source: Source;
    }>;
    unique_value_propositions: Array<{
        proposition: string;
        supporting_evidence: string;
        source: Source;
    }>;
}

export interface PricingStructure {
    pricing_models: Array<{
        model_type: string;
        description: string;
        price_range: string;
        billing_frequency: string;
        source: Source;
    }>;
    tiers: Array<{
        tier_name: string;
        price: string;
        features_included: string[];
        target_customer: string;
        source: Source;
    }>;
    competitive_positioning: {
        market_position: string;
        price_comparison: string;
        value_justification: string;
        sources: Source[];
    };
}

export interface CompetitiveAnalysis {
    direct_competitors: Array<{
        company_name: string;
        market_share: string;
        strengths: string[];
        weaknesses: string[];
        pricing_comparison: string;
        differentiation: string;
        source: Source;
    }>;
    indirect_competitors: Array<{
        company_name: string;
        alternative_solution: string;
        threat_level: string;
        source: Source;
    }>;
    competitive_advantages: Array<{
        advantage: string;
        description: string;
        sustainability: string;
        source: Source;
    }>;
    threats: Array<{
        threat: string;
        impact_level: string;
        timeline: string;
        mitigation_strategy: string;
        source: Source;
    }>;
}

export interface MarketPosition {
    market_size: {
        total_addressable_market: string;
        serviceable_addressable_market: string;
        market_growth_rate: string;
        geographic_presence: string[];
        sources: Source[];
    };
    growth_trends: Array<{
        trend: string;
        impact: string;
        timeline: string;
        source: Source;
    }>;
    key_opportunities: Array<{
        opportunity: string;
        potential_impact: string;
        feasibility: string;
        source: Source;
    }>;
    challenges: Array<{
        challenge: string;
        severity: string;
        potential_solutions: string[];
        source: Source;
    }>;
}

export interface Metadata {
    research_date: string; // YYYY-MM-DD
    data_freshness: string;
    confidence_score: string;
    key_sources: Source[];
    limitations: string[];
    follow_up_questions: string[];
}

export interface CompanyBrief {
    company_profile: CompanyProfile;
    products_services: ProductsServices;
    pricing_structure: PricingStructure;
    competitive_analysis: CompetitiveAnalysis;
    market_position: MarketPosition;
    metadata: Metadata;
}

