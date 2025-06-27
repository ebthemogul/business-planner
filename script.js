// Global data storage
let businessData = {
    customers: [],
    revenues: [],
    shortTermGoals: [],
    mediumTermGoals: [],
    longTermGoals: [],
    skillsHave: [],
    skillsNeed: [],
    equipment: [],
    support: [],
    firstSteps: []
};


// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    updateFinancials();
    updateSummary();
    
    // Add event listeners for form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateSummary);
    });
});


function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}


// List management functions
function addCustomer() {
    const input = document.getElementById('customerInput');
    const value = input.value.trim();
    if (value) {
        businessData.customers.push(value);
        input.value = '';
        updateList('customerList', businessData.customers, 'customers');
        updateSummary();
    }
}


function addRevenue() {
    const input = document.getElementById('revenueInput');
    const value = input.value.trim();
    if (value) {
        businessData.revenues.push(value);
        input.value = '';
        updateList('revenueList', businessData.revenues, 'revenues');
        updateSummary();
    }
}


function addShortTermGoal() {
    const input = document.getElementById('shortTermInput');
    const value = input.value.trim();
    if (value) {
        businessData.shortTermGoals.push(value);
        input.value = '';
        updateList('shortTermList', businessData.shortTermGoals, 'shortTermGoals');
        updateSummary();
    }
}


function addMediumTermGoal() {
    const input = document.getElementById('mediumTermInput');
    const value = input.value.trim();
    if (value) {
        businessData.mediumTermGoals.push(value);
        input.value = '';
        updateList('mediumTermList', businessData.mediumTermGoals, 'mediumTermGoals');
        updateSummary();
    }
}


function addLongTermGoal() {
    const input = document.getElementById('longTermInput');
    const value = input.value.trim();
    if (value) {
        businessData.longTermGoals.push(value);
        input.value = '';
        updateList('longTermList', businessData.longTermGoals, 'longTermGoals');
        updateSummary();
    }
}


function addSkillHave() {
    const input = document.getElementById('skillsHaveInput');
    const value = input.value.trim();
    if (value) {
        businessData.skillsHave.push(value);
        input.value = '';
        updateList('skillsHaveList', businessData.skillsHave, 'skillsHave');
        updateSummary();
    }
}


function addSkillNeed() {
    const input = document.getElementById('skillsNeedInput');
    const value = input.value.trim();
    if (value) {
        businessData.skillsNeed.push(value);
        input.value = '';
        updateList('skillsNeedList', businessData.skillsNeed, 'skillsNeed');
        updateSummary();
    }
}


function addEquipment() {
    const input = document.getElementById('equipmentInput');
    const value = input.value.trim();
    if (value) {
        businessData.equipment.push(value);
        input.value = '';
        updateList('equipmentList', businessData.equipment, 'equipment');
        updateSummary();
    }
}


function addSupport() {
    const input = document.getElementById('supportInput');
    const value = input.value.trim();
    if (value) {
        businessData.support.push(value);
        input.value = '';
        updateList('supportList', businessData.support, 'support');
        updateSummary();
    }
}


function addFirstStep() {
    const input = document.getElementById('firstStepInput');
    const value = input.value.trim();
    if (value) {
        businessData.firstSteps.push(value);
        input.value = '';
        updateList('firstStepList', businessData.firstSteps, 'firstSteps');
        updateSummary();
    }
}


function updateList(containerId, array, arrayName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (array.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; font-style: italic; font-size: 0.9rem;">No items added yet</p>';
        return;
    }
    
    array.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';
        itemDiv.innerHTML = `
            <span>${item}</span>
            <button class="remove-btn" onclick="removeItem('${arrayName}', ${index})">Remove</button>
        `;
        container.appendChild(itemDiv);
    });
}


function removeItem(arrayName, index) {
    businessData[arrayName].splice(index, 1);
    
    // Update the corresponding list display
    const listMappings = {
        customers: 'customerList',
        revenues: 'revenueList',
        shortTermGoals: 'shortTermList',
        mediumTermGoals: 'mediumTermList',
        longTermGoals: 'longTermList',
        skillsHave: 'skillsHaveList',
        skillsNeed: 'skillsNeedList',
        equipment: 'equipmentList',
        support: 'supportList',
        firstSteps: 'firstStepList'
    };
    
    updateList(listMappings[arrayName], businessData[arrayName], arrayName);
    updateSummary();
}


// Financial calculations
function updateFinancials() {
    const startupCosts = [
        'equipmentCost', 'inventoryCost', 'marketingCost', 'legalCost', 'otherStartupCost'
    ];
    
    const monthlyCosts = [
        'rentCost', 'utilitiesCost', 'suppliesCost', 'monthlyMarketingCost', 'insuranceCost', 'otherMonthlyCost'
    ];
    
    let totalStartup = 0;
    let totalMonthly = 0;
    
    startupCosts.forEach(id => {
        const value = parseFloat(document.getElementById(id).value.replace(/[$,]/g, '')) || 0;
        totalStartup += value;
    });
    
    monthlyCosts.forEach(id => {
        const value = parseFloat(document.getElementById(id).value.replace(/[$,]/g, '')) || 0;
        totalMonthly += value;
    });
    
    document.getElementById('totalStartup').textContent = totalStartup.toLocaleString();
    document.getElementById('totalMonthly').textContent = totalMonthly.toLocaleString();
    document.getElementById('breakEven').textContent = totalMonthly.toLocaleString();
    document.getElementById('recommendedTarget').textContent = (totalMonthly * 1.5).toLocaleString();
    
    updateSummary();
}


// Summary and completion tracking
function updateSummary() {
    const businessIdea = document.getElementById('businessIdea').value;
    const problemSolved = document.getElementById('problemSolved').value;
    const valueProposition = document.getElementById('valueProposition').value;
    const businessModel = document.getElementById('businessModel').value;
    
    const totalStartup = parseFloat(document.getElementById('totalStartup').textContent.replace(/,/g, '')) || 0;
    const totalMonthly = parseFloat(document.getElementById('totalMonthly').textContent.replace(/,/g, '')) || 0;
    
    // Calculate completion score
    let score = 0;
    if (businessIdea) score += 15;
    if (problemSolved) score += 15;
    if (businessData.customers.length > 0) score += 15;
    if (businessModel) score += 15;
    if (totalStartup > 0) score += 10;
    if (totalMonthly > 0) score += 10;
    if (businessData.shortTermGoals.length > 0) score += 10;
    if (businessData.firstSteps.length > 0) score += 10;
    
    // Update completion header
    const completionHeader = document.getElementById('completionHeader');
    const completionTitle = document.getElementById('completionTitle');
    const completionMessage = document.getElementById('completionMessage');
    const completionPercentage = document.getElementById('completionPercentage');
    
    completionPercentage.textContent = score + '%';
    
    if (score >= 80) {
        completionHeader.className = 'completion-header complete';
        completionTitle.textContent = '🎉 Congratulations!';
        completionMessage.textContent = 'Your business plan is ready! Download your personalized strategy documents below.';
        document.getElementById('downloadSection').classList.remove('hidden');
    } else {
        completionHeader.className = 'completion-header incomplete';
        completionTitle.textContent = '📋 Business Plan in Progress';
        completionMessage.textContent = 'Complete a few more sections to unlock your full business strategy package.';
        document.getElementById('downloadSection').classList.add('hidden');
    }
    
    // Update summary stats
    document.getElementById('summaryStartupCost').textContent = '$' + totalStartup.toLocaleString();
    document.getElementById('summaryRevenueTarget').textContent = '$' + (totalMonthly * 1.5).toLocaleString();
    document.getElementById('summaryCustomers').textContent = businessData.customers.length;
    document.getElementById('summarySteps').textContent = businessData.firstSteps.length;
    
    // Update recommendations
    updateRecommendations();
    updateActionPlan();
}


function updateRecommendations() {
    const businessModel = document.getElementById('businessModel').value;
    const totalStartup = parseFloat(document.getElementById('totalStartup').textContent.replace(/,/g, '')) || 0;
    const recommendations = [];
    
    // Business model specific recommendations
    if (businessModel.includes('Service Provider')) {
        recommendations.push({
            title: 'Focus on Building Your Portfolio',
            description: 'Start with 2-3 case studies or sample projects to showcase your expertise.',
            priority: 'High',
            category: 'Service Business'
        });
    }
    
    if (businessModel.includes('Product Sales')) {
        recommendations.push({
            title: 'Validate Your Product Market Fit',
            description: 'Before mass production, test with 10-20 potential customers.',
            priority: 'High',
            category: 'Product Business'
        });
    }
    
    // Financial recommendations
    if (totalStartup < 1000) {
        recommendations.push({
            title: 'Low-Cost Launch Strategy',
            description: 'Perfect for bootstrapping! Focus on pre-sales and MVP approach.',
            priority: 'Medium',
            category: 'Financial'
        });
    } else if (totalStartup > 10000) {
        recommendations.push({
            title: 'Secure Adequate Funding',
            description: 'Consider SBA loans, investors, or phased launch to reduce initial risk.',
            priority: 'High',
            category: 'Financial'
        });
    }
    
    // Customer recommendations
    if (businessData.customers.length === 1) {
        recommendations.push({
            title: 'Expand Customer Segments',
            description: 'Identify 2-3 additional customer types to reduce market risk.',
            priority: 'Medium',
            category: 'Marketing'
        });
    }
    
    // Goals recommendations
    if (businessData.shortTermGoals.length === 0) {
        recommendations.push({
            title: 'Set Immediate Milestones',
            description: 'Break down your launch into weekly goals for the next 3 months.',
            priority: 'High',
            category: 'Planning'
        });
    }
    
    // Update recommendations display
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    if (recommendations.length === 0) {
        recommendationsList.innerHTML = '<p>Complete more sections to receive personalized recommendations.</p>';
        return;
    }
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-item';
        recDiv.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${rec.category}</span>
                <span class="priority-${rec.priority.toLowerCase()}">${rec.priority} Priority</span>
            </div>
            <h5>${rec.title}</h5>
            <p>${rec.description}</p>
        `;
        recommendationsList.appendChild(recDiv);
    });
}


function updateActionPlan() {
    const businessIdea = document.getElementById('businessIdea').value;
    
    const actionPlan = {
        week1: [],
        week3: [],
        month2: [],
        month4: []
    };
    
    if (!businessIdea) {
        actionPlan.week1.push('Finalize business concept and value proposition');
    } else {
        actionPlan.week1.push('Research competitors and validate market demand');
    }
    
    if (businessData.firstSteps.length > 0) {
        actionPlan.week1.push(...businessData.firstSteps.slice(0, 2));
        actionPlan.week3.push(...businessData.firstSteps.slice(2, 4));
    }
    
    actionPlan.week1.push('Register business name and structure');
    actionPlan.week3.push('Set up business bank account and basic accounting');
    actionPlan.month2.push('Launch MVP or initial service offering');
    actionPlan.month4.push('Scale marketing and optimize operations');
    
    // Update action plan display
    updateTaskList('week1Tasks', actionPlan.week1);
    updateTaskList('week3Tasks', actionPlan.week3);
    updateTaskList('month2Tasks', actionPlan.month2);
    updateTaskList('month4Tasks', actionPlan.month4);
}


function updateTaskList(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: #22c55e; margin-right: 8px;">✓</span>${task}`;
        container.appendChild(li);
    });
}


// Download functions
function downloadBusinessPlan() {
    const businessIdea = document.getElementById('businessIdea').value || 'My Business';
    const problemSolved = document.getElementById('problemSolved').value || 'Not defined';
    const valueProposition = document.getElementById('valueProposition').value || 'Not defined';
    const businessModel = document.getElementById('businessModel').value || 'Not selected';
    
    const totalStartup = document.getElementById('totalStartup').textContent;
    const totalMonthly = document.getElementById('totalMonthly').textContent;
    const recommendedTarget = document.getElementById('recommendedTarget').textContent;
    
    const planContent = `# ${businessIdea} - Business Plan


## Executive Summary
**Business Idea:** ${businessIdea}
**Problem Solved:** ${problemSolved}
**Value Proposition:** ${valueProposition}
**Business Model:** ${businessModel}


## Financial Overview
- **Total Startup Costs:** ${totalStartup}
- **Monthly Operating Expenses:** ${totalMonthly}
- **Monthly Revenue Target:** ${recommendedTarget}


## Target Customers
${businessData.customers.map(customer => `- ${customer}`).join('\n') || '- Not yet defined'}


## Revenue Streams
${businessData.revenues.map(stream => `- ${stream}`).join('\n') || '- Not yet defined'}


## Goals
### Short-term (3 months)
${businessData.shortTermGoals.map(goal => `- ${goal}`).join('\n') || '- No goals set yet'}


### Medium-term (3-12 months)
${businessData.mediumTermGoals.map(goal => `- ${goal}`).join('\n') || '- No goals set yet'}


### Long-term (1-3 years)
${businessData.longTermGoals.map(goal => `- ${goal}`).join('\n') || '- No goals set yet'}


## Skills Assessment
### Skills You Have
${businessData.skillsHave.map(skill => `- ${skill}`).join('\n') || '- None listed yet'}


### Skills You Need
${businessData.skillsNeed.map(skill => `- ${skill}`).join('\n') || '- None listed yet'}


## Resources Needed
### Equipment/Tools
${businessData.equipment.map(item => `- ${item}`).join('\n') || '- None listed yet'}


### Support Network
${businessData.support.map(person => `- ${person}`).join('\n') || '- None listed yet'}


## First Steps Action Plan
${businessData.firstSteps.map((step, index) => `${index + 1}. ${step}`).join('\n') || '1. Complete the business planning sections'}


## Funding Strategy
**Funding Source:** ${document.getElementById('fundingSource').value || 'Not selected'}


---
Generated by Beginner Business Strategy Planner
Date: ${new Date().toLocaleDateString()}
Contact: https://stan.store/EbTheMogul for personalized business coaching
    `;


    downloadFile(planContent, `${businessIdea.replace(/[^a-z0-9]/gi, '_')}_Business_Plan.txt`);
}


function downloadActionPlan() {
    const actionContent = `# 90-Day Business Launch Action Plan


## Week 1-2: Foundation Phase
${document.getElementById('week1Tasks').innerHTML.replace(/<[^>]*>/g, '').split('\n').filter(line => line.trim()).map(line => `- ${line.replace('✓', '').trim()}`).join('\n')}


## Week 3-4: Setup Phase  
${document.getElementById('week3Tasks').innerHTML.replace(/<[^>]*>/g, '').split('\n').filter(line => line.trim()).map(line => `- ${line.replace('✓', '').trim()}`).join('\n')}


## Month 2-3: Launch Phase
${document.getElementById('month2Tasks').innerHTML.replace(/<[^>]*>/g, '').split('\n').filter(line => line.trim()).map(line => `- ${line.replace('✓', '').trim()}`).join('\n')}


## Month 4-6: Growth Phase
${document.getElementById('month4Tasks').innerHTML.replace(/<[^>]*>/g, '').split('\n').filter(line => line.trim()).map(line => `- ${line.replace('✓', '').trim()}`).join('\n')}


## Pre-Launch Checklist


### Legal & Administrative
- [ ] Choose business structure (LLC, Corp, etc.)
- [ ] Register business name
- [ ] Get required licenses/permits
- [ ] Open business bank account
- [ ] Get business insurance
- [ ] Set up basic bookkeeping system


### Marketing & Operations
- [ ] Create simple website/online presence
- [ ] Design basic logo/branding
- [ ] Set up social media accounts
- [ ] Create pricing structure
- [ ] Develop service/product delivery process
- [ ] Plan customer communication system


---
Generated: ${new Date().toLocaleDateString()}
For personalized guidance: https://stan.store/EbTheMogul
    `;


    downloadFile(actionContent, 'Business_Launch_Action_Plan.txt');
}


function downloadFinancials() {
    const totalStartup = document.getElementById('totalStartup').textContent;
    const totalMonthly = document.getElementById('totalMonthly').textContent;
    const breakEven = document.getElementById('breakEven').textContent;
    const recommendedTarget = document.getElementById('recommendedTarget').textContent;


    const financialContent = `# Financial Projections & Analysis


## Startup Investment Required
- Equipment & Tools: ${document.getElementById('equipmentCost').value || '0'}
- Initial Inventory: ${document.getElementById('inventoryCost').value || '0'}
- Marketing & Branding: ${document.getElementById('marketingCost').value || '0'}
- Legal & Registration: ${document.getElementById('legalCost').value || '0'}
- Other Startup Costs: ${document.getElementById('otherStartupCost').value || '0'}
**Total Startup Costs: ${totalStartup}**


## Monthly Operating Expenses
- Rent/Office Space: ${document.getElementById('rentCost').value || '0'}
- Utilities & Internet: ${document.getElementById('utilitiesCost').value || '0'}
- Supplies & Materials: ${document.getElementById('suppliesCost').value || '0'}
- Marketing & Advertising: ${document.getElementById('monthlyMarketingCost').value || '0'}
- Insurance: ${document.getElementById('insuranceCost').value || '0'}
- Other Monthly Costs: ${document.getElementById('otherMonthlyCost').value || '0'}
**Total Monthly Expenses: ${totalMonthly}**


## Break-Even Analysis
- **Break-Even Revenue:** ${breakEven}/month
- **Recommended Target:** ${recommendedTarget}/month (includes 50% profit buffer)


## 6-Month Cash Flow Projection
Month 1: -${totalStartup} (startup costs) - ${totalMonthly} = -${(parseFloat(totalStartup.replace(/,/g, '')) + parseFloat(totalMonthly.replace(/,/g, ''))).toLocaleString()}
Month 2-6: -${totalMonthly}/month (assuming break-even by month 6)


**Total Investment Needed:** ${(parseFloat(totalStartup.replace(/,/g, '')) + (parseFloat(totalMonthly.replace(/,/g, '')) * 6)).toLocaleString()}


## Funding Strategy
**Selected Funding Source:** ${document.getElementById('fundingSource').value || 'Not selected'}


## Revenue Projections (Conservative Estimate)
Month 1: ${Math.round(parseFloat(breakEven.replace(/,/g, '')) * 0.2).toLocaleString()}
Month 2: ${Math.round(parseFloat(breakEven.replace(/,/g, '')) * 0.4).toLocaleString()}
Month 3: ${Math.round(parseFloat(breakEven.replace(/,/g, '')) * 0.6).toLocaleString()}
Month 4: ${Math.round(parseFloat(breakEven.replace(/,/g, '')) * 0.8).toLocaleString()}
Month 5: ${breakEven}
Month 6: ${recommendedTarget}


---
Generated: ${new Date().toLocaleDateString()}
For financial planning consultation: https://stan.store/EbTheMogul
    `;


    downloadFile(financialContent, 'Business_Financial_Projections.txt');
}


function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// Save and email functions
function saveProgress() {
    const allData = {
        businessIdea: document.getElementById('businessIdea').value,
        problemSolved: document.getElementById('problemSolved').value,
        valueProposition: document.getElementById('valueProposition').value,
        businessModel: document.getElementById('businessModel').value,
        fundingSource: document.getElementById('fundingSource').value,
        financials: {
            equipmentCost: document.getElementById('equipmentCost').value,
            inventoryCost: document.getElementById('inventoryCost').value,
            marketingCost: document.getElementById('marketingCost').value,
            legalCost: document.getElementById('legalCost').value,
            otherStartupCost: document.getElementById('otherStartupCost').value,
            rentCost: document.getElementById('rentCost').value,
            utilitiesCost: document.getElementById('utilitiesCost').value,
            suppliesCost: document.getElementById('suppliesCost').value,
            monthlyMarketingCost: document.getElementById('monthlyMarketingCost').value,
            insuranceCost: document.getElementById('insuranceCost').value,
            otherMonthlyCost: document.getElementById('otherMonthlyCost').value
        },
        lists: businessData
    };


    localStorage.setItem('businessPlannerData', JSON.stringify(allData));
    alert('✅ Progress saved successfully! Your data will be restored when you return.');
}


function emailSummary() {
    const businessIdea = document.getElementById('businessIdea').value || 'My Business';
    const completionScore = document.getElementById('completionPercentage').textContent;
    
    const subject = encodeURIComponent(`My Business Plan Summary - ${businessIdea}`);
    const body = encodeURIComponent(`Hi there!


I've been working on my business plan using the Beginner Business Strategy Planner and wanted to share my progress.


Business Idea: ${businessIdea}
Completion: ${completionScore}


I'd love to discuss next steps for launching my business!


Best regards`);


    window.open(`mailto:?subject=${subject}&body=${body}`);
}


// Load saved data on page load
function loadSavedData() {
    const savedData = localStorage.getItem('businessPlannerData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Restore form fields
            if (data.businessIdea) document.getElementById('businessIdea').value = data.businessIdea;
            if (data.problemSolved) document.getElementById('problemSolved').value = data.problemSolved;
            if (data.valueProposition) document.getElementById('valueProposition').value = data.valueProposition;
            if (data.businessModel) document.getElementById('businessModel').value = data.businessModel;
            if (data.fundingSource) document.getElementById('fundingSource').value = data.fundingSource;
            
            // Restore financial fields
            if (data.financials) {
                Object.keys(data.financials).forEach(key => {
                    const element = document.getElementById(key);
                    if (element && data.financials[key]) {
                        element.value = data.financials[key];
                    }
                });
            }
            
            // Restore lists
            if (data.lists) {
                businessData = { ...businessData, ...data.lists };
                
                // Update all list displays
                updateList('customerList', businessData.customers, 'customers');
                updateList('revenueList', businessData.revenues, 'revenues');
                updateList('shortTermList', businessData.shortTermGoals, 'shortTermGoals');
                updateList('mediumTermList', businessData.mediumTermGoals, 'mediumTermGoals');
                updateList('longTermList', businessData.longTermGoals, 'longTermGoals');
                updateList('skillsHaveList', businessData.skillsHave, 'skillsHave');
                updateList('skillsNeedList', businessData.skillsNeed, 'skillsNeed');
                updateList('equipmentList', businessData.equipment, 'equipment');
                updateList('supportList', businessData.support, 'support');
                updateList('firstStepList', businessData.firstSteps, 'firstSteps');
            }
            
            // Update calculations
            updateFinancials();
            updateSummary();
            
        } catch (error) {
            console.log('Error loading saved data:', error);
        }
    }
}


// Add enter key support for list inputs
document.addEventListener('DOMContentLoaded', function() {
    const listInputs = [
        'customerInput', 'revenueInput', 'shortTermInput', 'mediumTermInput', 
        'longTermInput', 'skillsHaveInput', 'skillsNeedInput', 'equipmentInput', 
        'supportInput', 'firstStepInput'
    ];
    
    listInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const addFunctions = {
                        'customerInput': addCustomer,
                        'revenueInput': addRevenue,
                        'shortTermInput': addShortTermGoal,
                        'mediumTermInput': addMediumTermGoal,
                        'longTermInput': addLongTermGoal,
                        'skillsHaveInput': addSkillHave,
                        'skillsNeedInput': addSkillNeed,
                        'equipmentInput': addEquipment,
                        'supportInput': addSupport,
                        'firstStepInput': addFirstStep
                    };
                    
                    if (addFunctions[inputId]) {
                        addFunctions[inputId]();
                    }
                }
            });
        }
    });
    
    // Load saved data
    loadSavedData();
});