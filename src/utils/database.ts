import { supabase } from "@/integrations/supabase/client";

export const testDatabaseConnection = async () => {
  try {
    console.log("Testing database connection...");
    
    // Test basic connection
    const { data, error } = await supabase
      .from("companies")
      .select("count")
      .limit(1);
    
    if (error) {
      console.error("Database connection failed:", error);
      return false;
    }
    
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
};

export const initializeDatabase = async () => {
  try {
    console.log("Initializing database with sample data...");
    
    // Check if companies exist
    const { data: companies } = await supabase
      .from("companies")
      .select("id")
      .limit(1);
    
    if (!companies || companies.length === 0) {
      console.log("Creating sample companies...");
      await createSampleCompanies();
    }
    
    // Check if jobs exist
    const { data: jobs } = await supabase
      .from("jobs")
      .select("id")
      .limit(1);
    
    if (!jobs || jobs.length === 0) {
      console.log("Creating sample jobs...");
      await createSampleJobs();
    }
    
    console.log("Database initialization complete");
    return true;
  } catch (error) {
    console.error("Database initialization failed:", error);
    return false;
  }
};

const createSampleCompanies = async () => {
  const sampleCompanies = [
    {
      name: "TechCorp Solutions",
      description: "Leading technology consulting firm specializing in digital transformation and cloud solutions",
      website: "https://techcorp.com",
      location: "San Francisco, CA",
      industry: "Technology",
      size: "500-1000",
      logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "GreenEnergy Inc",
      description: "Renewable energy company focused on sustainable solutions and environmental impact",
      website: "https://greenenergy.com",
      location: "Austin, TX",
      industry: "Energy",
      size: "100-500",
      logo_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "FinanceFirst",
      description: "Premier financial services and investment firm with global reach",
      website: "https://financefirst.com",
      location: "New York, NY",
      industry: "Finance",
      size: "1000+",
      logo_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "HealthTech Innovations",
      description: "Healthcare technology startup revolutionizing patient care through AI",
      website: "https://healthtech.com",
      location: "Boston, MA",
      industry: "Healthcare",
      size: "50-100",
      logo_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "DataDriven Analytics",
      description: "Advanced analytics and machine learning solutions for enterprise clients",
      website: "https://datadriven.com",
      location: "Seattle, WA",
      industry: "Technology",
      size: "100-500",
      logo_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
    }
  ];

  const { error } = await supabase
    .from("companies")
    .insert(sampleCompanies);

  if (error) throw error;
};

const createSampleJobs = async () => {
  // Get companies first
  const { data: companies } = await supabase
    .from("companies")
    .select("id, name");

  if (!companies || companies.length === 0) {
    throw new Error("No companies found to create jobs");
  }

  const sampleJobs = [
    {
      company_id: companies[0].id,
      title: "Senior Frontend Developer",
      description: "Join our dynamic team to build cutting-edge web applications using modern technologies. You will work on challenging projects that impact millions of users worldwide.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS frameworks", "Git version control"],
      benefits: ["Health insurance", "Remote work options", "401k matching", "Professional development budget"],
      salary_min: 90000,
      salary_max: 130000,
      location: "San Francisco, CA",
      employment_type: "full-time",
      experience_level: "senior",
      skills_required: ["React", "TypeScript", "CSS", "JavaScript"],
      is_remote: true,
      is_active: true
    },
    {
      company_id: companies[1].id,
      title: "Marketing Manager",
      description: "Lead our marketing initiatives to promote sustainable energy solutions. Drive campaigns that make a real environmental impact.",
      requirements: ["3+ years marketing experience", "Digital marketing expertise", "Campaign management", "Analytics tools"],
      benefits: ["Health insurance", "Flexible hours", "Stock options", "Green commute benefits"],
      salary_min: 65000,
      salary_max: 85000,
      location: "Austin, TX",
      employment_type: "full-time",
      experience_level: "mid-level",
      skills_required: ["Marketing", "Digital Marketing", "Analytics"],
      is_remote: false,
      is_active: true
    },
    {
      company_id: companies[2].id,
      title: "Data Scientist",
      description: "Analyze financial data to drive investment decisions and risk assessment. Work with large datasets and cutting-edge ML models.",
      requirements: ["Masters in Data Science or related field", "Python/R proficiency", "Machine learning experience", "Financial domain knowledge"],
      benefits: ["Competitive salary", "Bonus structure", "Health insurance", "Learning stipend"],
      salary_min: 100000,
      salary_max: 150000,
      location: "New York, NY",
      employment_type: "full-time",
      experience_level: "senior",
      skills_required: ["Python", "Machine Learning", "SQL", "Statistics"],
      is_remote: false,
      is_active: true
    },
    {
      company_id: companies[3].id,
      title: "UX Designer",
      description: "Design intuitive healthcare applications that improve patient outcomes. Collaborate with medical professionals and developers.",
      requirements: ["3+ years UX design experience", "Healthcare domain knowledge preferred", "Figma/Sketch proficiency", "User research skills"],
      benefits: ["Health insurance", "Remote work", "Design conference budget", "Wellness programs"],
      salary_min: 70000,
      salary_max: 95000,
      location: "Boston, MA",
      employment_type: "full-time",
      experience_level: "mid-level",
      skills_required: ["UX Design", "Figma", "User Research"],
      is_remote: true,
      is_active: true
    },
    {
      company_id: companies[4].id,
      title: "Junior Backend Developer",
      description: "Start your career building scalable backend systems for data processing and analytics platforms.",
      requirements: ["Computer Science degree or bootcamp", "Basic programming skills", "Database knowledge", "Eagerness to learn"],
      benefits: ["Mentorship program", "Health insurance", "Flexible hours", "Learning budget"],
      salary_min: 55000,
      salary_max: 75000,
      location: "Seattle, WA",
      employment_type: "full-time",
      experience_level: "entry",
      skills_required: ["Python", "SQL", "APIs"],
      is_remote: false,
      is_active: true
    }
  ];

  const { error } = await supabase
    .from("jobs")
    .insert(sampleJobs);

  if (error) throw error;
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const createUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        ...profileData,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};