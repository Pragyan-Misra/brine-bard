import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Database, 
  Waves, 
  Bot,
  Award,
  GraduationCap,
  MapPin
} from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Team Lead & Full-Stack Developer',
      branch: 'Computer Science',
      year: 'Final Year',
      avatar: '👨‍💻',
      bio: 'Passionate about AI applications in Earth sciences. Led the development of the RAG pipeline and backend architecture.',
      skills: ['React', 'Python', 'FastAPI', 'AI/ML', 'System Design'],
      achievements: ['Published AI research', 'Google Summer of Code Alumni', 'Hackathon Winner'],
      github: 'alexchen-dev',
      linkedin: 'alexchen-cs',
      email: 'alex.chen@university.edu'
    },
    {
      name: 'Dr. Sarah Martinez',
      role: 'Oceanography Advisor & Domain Expert',
      branch: 'Marine Sciences',
      year: 'Faculty',
      avatar: '👩‍🔬',
      bio: 'Oceanographer specializing in ARGO data analysis. Provided scientific guidance and validation for data processing methods.',
      skills: ['Oceanography', 'ARGO Networks', 'Climate Science', 'Data Analysis', 'NetCDF'],
      achievements: ['20+ Publications', 'NSF Grant Recipient', 'Ocean Science Expert'],
      linkedin: 'sarah-martinez-ocean',
      email: 'sarah.martinez@university.edu'
    },
    {
      name: 'Jamie Kim',
      role: 'AI/ML Engineer & Data Scientist',
      branch: 'Data Science',
      year: '3rd Year',
      avatar: '👩‍💼',
      bio: 'Specialized in embedding models and vector search. Implemented the semantic similarity engine and LLM integration.',
      skills: ['Machine Learning', 'NLP', 'Vector Databases', 'PyTorch', 'Transformers'],
      achievements: ['ML Competition Winner', 'Research Assistant', 'FAANG Intern'],
      github: 'jamie-ai-ml',
      linkedin: 'jamie-kim-ds',
      email: 'jamie.kim@university.edu'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Frontend Developer & UI/UX Designer',
      branch: 'Computer Engineering',
      year: '2nd Year',
      avatar: '👨‍🎨',
      bio: 'Created the intuitive chat interface and data visualizations. Focused on making complex oceanographic data accessible.',
      skills: ['React', 'TypeScript', 'UI/UX Design', 'Data Visualization', 'Responsive Design'],
      achievements: ['Design Award Winner', 'Open Source Contributor', 'Frontend Mentor'],
      github: 'marcus-frontend',
      linkedin: 'marcus-rodriguez-dev',
      email: 'marcus.rodriguez@university.edu'
    },
    {
      name: 'Zara Patel',
      role: 'Database Engineer & DevOps',
      branch: 'Information Systems',
      year: '4th Year',
      avatar: '👩‍⚙️',
      bio: 'Architected the PostgreSQL schema and FAISS vector database. Managed deployment and scalability considerations.',
      skills: ['PostgreSQL', 'Vector Databases', 'Docker', 'AWS', 'Database Optimization'],
      achievements: ['Database Certification', 'Cloud Architecture Award', 'DevOps Specialist'],
      github: 'zara-dbops',
      linkedin: 'zara-patel-db',
      email: 'zara.patel@university.edu'
    },
    {
      name: 'Prof. David Thompson',
      role: 'Project Mentor & Technical Advisor',
      branch: 'Computer Science Department',
      year: 'Faculty',
      avatar: '👨‍🏫',
      bio: 'Professor of Computer Science specializing in AI applications. Provided technical mentorship and project guidance.',
      skills: ['AI Research', 'Project Management', 'Academic Leadership', 'Innovation Strategy'],
      achievements: ['PhD in AI', '50+ Research Papers', 'IEEE Fellow', 'Innovation Award'],
      linkedin: 'prof-david-thompson',
      email: 'david.thompson@university.edu'
    }
  ];

  const projectStats = [
    { icon: Code, label: 'Lines of Code', value: '15,000+' },
    { icon: Database, label: 'Data Points Processed', value: '2M+' },
    { icon: Bot, label: 'AI Models Integrated', value: '3' },
    { icon: Award, label: 'Weeks of Development', value: '8' }
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg">
            <Users className="h-12 w-12" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A passionate group of students and faculty working together to revolutionize ocean data accessibility 
            through AI innovation.
          </p>
        </div>
      </section>

      {/* Project Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {projectStats.map((stat, index) => (
          <Card key={index} className="text-center p-6 data-glow group hover:scale-105 transition-all duration-300">
            <CardContent className="space-y-3">
              <div className="mx-auto p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 text-primary w-fit group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Team Members */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Team Members</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining expertise in computer science, oceanography, AI/ML, and user experience design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass border-0 data-glow group hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl bg-gradient-to-r from-primary/10 to-accent/10 rounded-full p-3 flex items-center justify-center">
                    {member.avatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        {member.branch}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {member.year}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  {member.bio}
                </p>
                
                {/* Skills */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Achievements</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.achievements.map((achievement) => (
                      <Badge key={achievement} className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Contact Links */}
                <div className="flex gap-2 pt-2">
                  {member.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Collaboration Philosophy */}
      <Card className="glass border-0 data-glow">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            Our Collaboration Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 text-center">
              <div className="mx-auto p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 text-primary w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-semibold">Interdisciplinary Teamwork</h4>
              <p className="text-sm text-muted-foreground">
                Bringing together computer science and oceanography expertise for innovative solutions.
              </p>
            </div>
            
            <div className="space-y-3 text-center">
              <div className="mx-auto p-3 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 text-accent w-fit">
                <Code className="h-6 w-6" />
              </div>
              <h4 className="font-semibold">Open Source Innovation</h4>
              <p className="text-sm text-muted-foreground">
                Committed to sharing knowledge and contributing to the scientific computing community.
              </p>
            </div>
            
            <div className="space-y-3 text-center">
              <div className="mx-auto p-3 rounded-lg bg-gradient-to-r from-success/20 to-primary/20 text-success w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="font-semibold">Excellence in Design</h4>
              <p className="text-sm text-muted-foreground">
                Focusing on user experience, scientific accuracy, and technical excellence.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Team */}
      <Card className="glass border-0 data-glow text-center p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Mail className="h-12 w-12 mx-auto text-accent" />
          <h3 className="text-2xl md:text-3xl font-bold">Want to Collaborate?</h3>
          <p className="text-lg text-muted-foreground">
            Interested in our project, want to contribute, or have questions about our approach? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ocean" size="lg" asChild>
              <a href="mailto:floatchat-team@university.edu">
                <Mail className="h-5 w-5" />
                Contact Our Team
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/floatchat/project" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Team;