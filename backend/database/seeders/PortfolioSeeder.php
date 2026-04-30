<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Skills
        Skill::create(['category' => 'Languages', 'skills' => ['PHP', 'JavaScript', 'C++', 'C']]);
        Skill::create(['category' => 'Frontend', 'skills' => ['React.js', 'Redux', 'Tailwind CSS', 'Bootstrap']]);
        Skill::create(['category' => 'Backend', 'skills' => ['Laravel', 'MySQL', 'Rest API', 'Microservices']]);
        Skill::create(['category' => 'Tools & DevOps', 'skills' => ['Docker', 'GitLab', 'CI/CD', 'Jira', 'VS Code']]);

        // Experience
        Experience::create([
            'company' => 'Super Star Group (Bizz Solutions PLC)',
            'role' => 'Software Engineer',
            'period' => 'Jan 2025 - Present',
            'description' => 'Developed claim service for admin panel. Led front-end development for SSG Official website. Managed product categories and incident services backend.',
            'stack' => ['PHP', 'Laravel', 'React.js', 'MySQL', 'Redux']
        ]);
        Experience::create([
            'company' => 'Super Star Group (Bizz Solutions PLC)',
            'role' => 'Software Engineer (Intern)',
            'period' => 'May 2024 - Dec 2024',
            'description' => 'Contributed to monolithic ERP application. Developed robust Excel data ingestion process. Developed functionalities for EDU TV (E-learning management system).',
            'stack' => ['PHP', 'Laravel', 'MySQL', 'React.js', 'Redux']
        ]);

        // Projects
        Project::create([
            'title' => 'SSG Official Website',
            'category' => 'Company Portfolio & Admin System',
            'description' => 'Full dynamic system where admin can manage everything. Developed claim services and core product categories.',
            'stack' => ['PHP', 'Laravel', 'React.js', 'MySQL', 'Redux']
        ]);
        Project::create([
            'title' => 'Bizz ERP (Procurement)',
            'category' => 'Enterprise Resource Planning',
            'description' => 'Microservices-based Procurement System emphasizing scalable architecture and domain-driven service design. Integrated centralized authentication.',
            'stack' => ['PHP', 'Laravel', 'MySQL', 'Docker', 'GitLab']
        ]);
        Project::create([
            'title' => 'EDU TV',
            'category' => 'E-Learning Management System',
            'description' => 'Developed certificate management system and optimized previous queries for fast data loading.',
            'stack' => ['PHP', 'Laravel', 'React.js', 'MySQL', 'Redux']
        ]);
        Project::create([
            'title' => 'BizzPack ERP (Sales Module)',
            'category' => 'Enterprise Resource Planning',
            'description' => 'Comprehensive sales management module featuring proforma invoice generation, LC opening workflows, and multi-currency support.',
            'stack' => ['PHP', 'Laravel', 'MySQL', 'React.js', 'Redux']
        ]);
    }
}
