// Skill Tree Interactive System

class SkillTree {
  constructor() {
    this.canvas = document.getElementById('tree-canvas');
    this.detailPanel = document.getElementById('detail-panel');
    this.nodes = new Map();
    this.connections = [];
    this.selectedNode = null;
    
    this.init();
  }

  init() {
    this.createSkillTreeData();
    this.renderTree();
    this.setupEventListeners();
  }

  createSkillTreeData() {
    // Define the complete skill tree structure
    this.treeData = {
      'aws': {
        id: 'aws',
        title: 'AWS',
        icon: '☁️',
        level: 'Root',
        type: 'root',
        position: { x: 200, y: 100 },
        status: 'completed',
        children: ['ec2', 's3', 'rds', 'lambda'],
        details: {
          definition: 'Amazon Web Services - Cloud computing platform providing on-demand computing resources.',
          examples: ['EC2 virtual servers', 'S3 object storage', 'RDS managed databases'],
          bestPractices: [
            'Use IAM roles instead of access keys',
            'Enable CloudTrail for audit logging',
            'Implement least privilege access',
            'Use multiple availability zones'
          ],
          resources: [
            { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
            { title: 'AWS Training', url: 'https://aws.amazon.com/training/' }
          ]
        }
      },
      's3': {
        id: 's3',
        title: 'S3',
        icon: '📦',
        level: 'Core',
        type: 'service',
        position: { x: 300, y: 250 },
        status: 'completed',
        parent: 'aws',
        children: ['s3-buckets', 's3-lifecycle'],
        details: {
          definition: 'Simple Storage Service - Object storage service with industry-leading scalability.',
          examples: ['Static website hosting', 'Data backup and archiving', 'Content distribution'],
          bestPractices: [
            'Enable versioning for important data',
            'Use lifecycle policies for cost optimization',
            'Implement proper bucket policies',
            'Enable server-side encryption'
          ],
          resources: [
            { title: 'S3 User Guide', url: 'https://docs.aws.amazon.com/s3/' },
            { title: 'S3 Best Practices', url: 'https://aws.amazon.com/s3/getting-started/' }
          ]
        }
      },
      'rds': {
        id: 'rds',
        title: 'RDS',
        icon: '🗄️',
        level: 'Core',
        type: 'service',
        position: { x: 100, y: 250 },
        status: 'completed',
        parent: 'aws',
        children: ['rds-multi-az', 'rds-read-replicas'],
        details: {
          definition: 'Relational Database Service - Managed relational database service.',
          examples: ['MySQL databases', 'PostgreSQL instances', 'Oracle databases'],
          bestPractices: [
            'Enable Multi-AZ for high availability',
            'Use Read Replicas for read scaling',
            'Implement automated backups',
            'Monitor database performance'
          ],
          resources: [
            { title: 'RDS User Guide', url: 'https://docs.aws.amazon.com/rds/' },
            { title: 'RDS Best Practices', url: 'https://aws.amazon.com/rds/getting-started/' }
          ]
        }
      },
      'lambda': {
        id: 'lambda',
        title: 'Lambda',
        icon: '⚡',
        level: 'Core',
        type: 'service',
        position: { x: 250, y: 250 },
        status: 'in-progress',
        parent: 'aws',
        children: ['lambda-triggers', 'lambda-layers'],
        details: {
          definition: 'AWS Lambda - Serverless compute service that runs code without managing servers.',
          examples: ['API backends', 'Data processing', 'Event-driven automation'],
          bestPractices: [
            'Keep functions small and focused',
            'Use environment variables for configuration',
            'Implement proper error handling',
            'Monitor function performance'
          ],
          resources: [
            { title: 'Lambda Developer Guide', url: 'https://docs.aws.amazon.com/lambda/' },
            { title: 'Serverless Best Practices', url: 'https://aws.amazon.com/lambda/getting-started/' }
          ]
        }
      },
      'ec2': {
        id: 'ec2',
        title: 'EC2',
        icon: '💻',
        level: 'Core',
        type: 'service',
        position: { x: 100, y: 250 },
        status: 'completed',
        parent: 'aws',
        children: ['security-groups', 'instance-types'],
        details: {
          definition: 'Elastic Compute Cloud - Virtual servers in the AWS cloud.',
          examples: ['Web servers', 'Application servers', 'Development environments'],
          bestPractices: [
            'Use appropriate instance types for workload',
            'Implement proper security groups',
            'Regular patching and updates',
            'Use Auto Scaling for high availability'
          ],
          resources: [
            { title: 'EC2 User Guide', url: 'https://docs.aws.amazon.com/ec2/' },
            { title: 'EC2 Best Practices', url: 'https://aws.amazon.com/ec2/getting-started/' }
          ]
        }
      },
      'instance-types': {
        id: 'instance-types',
        title: 'Instance Types',
        icon: '⚙️',
        level: 'Advanced',
        type: 'feature',
        position: { x: 150, y: 400 },
        status: 'completed',
        parent: 'ec2',
        children: [],
        details: {
          definition: 'Different EC2 instance configurations optimized for specific use cases.',
          examples: ['t3.micro for testing', 'm5.large for general purpose', 'c5.xlarge for compute-intensive'],
          bestPractices: [
            'Choose instance type based on workload requirements',
            'Use burstable instances for variable workloads',
            'Monitor CPU utilization and right-size',
            'Consider Spot instances for cost savings'
          ],
          resources: [
            { title: 'Instance Types Guide', url: 'https://docs.aws.amazon.com/ec2/latest/userguide/instance-types.html' },
            { title: 'Instance Selection', url: 'https://aws.amazon.com/ec2/instance-types/' }
          ]
        }
      },
      'security-groups': {
        id: 'security-groups',
        title: 'Security Groups',
        icon: '🛡️',
        level: 'Advanced',
        type: 'feature',
        position: { x: 50, y: 400 },
        status: 'completed',
        parent: 'ec2',
        children: ['inbound-rules', 'outbound-rules'],
        details: {
          definition: 'Virtual firewalls that control inbound and outbound traffic for EC2 instances.',
          examples: ['Allow HTTP/HTTPS traffic', 'SSH access from specific IPs', 'Database access from app servers'],
          bestPractices: [
            'Use least privilege principle',
            'Avoid 0.0.0.0/0 for SSH access',
            'Use descriptive names and descriptions',
            'Regular security group audits'
          ],
          resources: [
            { title: 'Security Groups Guide', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html' },
            { title: 'Security Best Practices', url: 'https://aws.amazon.com/security/security-learning/' }
          ]
        }
      },
      'outbound-rules': {
        id: 'outbound-rules',
        title: 'Outbound Rules',
        icon: '⬆️',
        level: 'Expert',
        type: 'config',
        position: { x: 80, y: 550 },
        status: 'completed',
        parent: 'security-groups',
        children: [],
        details: {
          definition: 'Rules that control outgoing traffic from your EC2 instances.',
          examples: [
            'HTTPS: Port 443 to 0.0.0.0/0 for API calls',
            'HTTP: Port 80 to 0.0.0.0/0 for package updates',
            'MySQL: Port 3306 to database security group',
            'DNS: Port 53 to 0.0.0.0/0 for name resolution'
          ],
          bestPractices: [
            'Default deny-all, then allow specific traffic',
            'Use security group references for internal communication',
            'Allow only necessary protocols and ports',
            'Document the purpose of each outbound rule',
            'Regular review of outbound access patterns'
          ],
          codeExample: `# Example Outbound Rules
# Web Server Security Group
Type: HTTPS
Protocol: TCP
Port: 443
Destination: 0.0.0.0/0

Type: HTTP
Protocol: TCP
Port: 80
Destination: 0.0.0.0/0

Type: MySQL/Aurora
Protocol: TCP
Port: 3306
Destination: sg-database-group`,
          resources: [
            { title: 'Outbound Rules Reference', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html' },
            { title: 'Network Security Best Practices', url: 'https://aws.amazon.com/vpc/security/' }
          ]
        }
      },
      'inbound-rules': {
        id: 'inbound-rules',
        title: 'Inbound Rules',
        icon: '⬇️',
        level: 'Expert',
        type: 'config',
        position: { x: 20, y: 550 },
        status: 'completed',
        parent: 'security-groups',
        children: [],
        details: {
          definition: 'Rules that control incoming traffic to your EC2 instances.',
          examples: [
            'HTTP: Port 80 from 0.0.0.0/0',
            'HTTPS: Port 443 from 0.0.0.0/0',
            'SSH: Port 22 from your IP only',
            'MySQL: Port 3306 from app security group'
          ],
          bestPractices: [
            'Never allow SSH (22) from 0.0.0.0/0',
            'Use security group references instead of IP ranges',
            'Document the purpose of each rule',
            'Regularly review and remove unused rules',
            'Use specific ports instead of port ranges when possible'
          ],
          codeExample: `# Example Security Group Rules
# Web Server Security Group
Type: HTTP
Protocol: TCP
Port: 80
Source: 0.0.0.0/0

Type: HTTPS  
Protocol: TCP
Port: 443
Source: 0.0.0.0/0

Type: SSH
Protocol: TCP
Port: 22
Source: YOUR_IP/32`,
          resources: [
            { title: 'Security Group Rules Reference', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html' },
            { title: 'VPC Security Best Practices', url: 'https://aws.amazon.com/vpc/security/' }
          ]
        }
      },
      'devops-tools': {
        id: 'devops-tools',
        title: 'DevOps Tools',
        icon: '🛠️',
        level: 'Root',
        type: 'root',
        position: { x: 500, y: 100 },
        status: 'completed',
        children: ['docker', 'ansible', 'github-actions'],
        details: {
          definition: 'Tools and practices for Development and Operations collaboration.',
          examples: ['Docker containers', 'Ansible automation', 'CI/CD pipelines'],
          bestPractices: [
            'Infrastructure as Code',
            'Automated testing and deployment',
            'Monitoring and logging',
            'Version control everything'
          ],
          resources: [
            { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops' },
            { title: 'DevOps Best Practices', url: 'https://aws.amazon.com/devops/' }
          ]
        }
      },
      'docker': {
        id: 'docker',
        title: 'Docker',
        icon: '🐳',
        level: 'Core',
        type: 'tool',
        position: { x: 450, y: 250 },
        status: 'completed',
        parent: 'devops-tools',
        children: ['dockerfile', 'docker-compose'],
        details: {
          definition: 'Platform for developing, shipping, and running applications in containers.',
          examples: ['Application containerization', 'Microservices deployment', 'Development environments'],
          bestPractices: [
            'Use multi-stage builds for smaller images',
            'Run containers as non-root users',
            'Use specific image tags, not latest',
            'Implement health checks'
          ],
          resources: [
            { title: 'Docker Documentation', url: 'https://docs.docker.com/' },
            { title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/best-practices/' }
          ]
        }
      },
      'ansible': {
        id: 'ansible',
        title: 'Ansible',
        icon: '🧰',
        level: 'Core',
        type: 'tool',
        position: { x: 550, y: 250 },
        status: 'completed',
        parent: 'devops-tools',
        children: ['playbooks', 'roles'],
        details: {
          definition: 'Automation tool for configuration management, application deployment, and orchestration.',
          examples: ['Server configuration', 'Application deployment', 'Infrastructure provisioning'],
          bestPractices: [
            'Use idempotent tasks',
            'Organize code with roles',
            'Use Ansible Vault for secrets',
            'Test playbooks in staging first'
          ],
          resources: [
            { title: 'Ansible Documentation', url: 'https://docs.ansible.com/' },
            { title: 'Ansible Best Practices', url: 'https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html' }
          ]
        }
      },
      'github-actions': {
        id: 'github-actions',
        title: 'GitHub Actions',
        icon: '⚙️',
        level: 'Core',
        type: 'tool',
        position: { x: 500, y: 250 },
        status: 'in-progress',
        parent: 'devops-tools',
        children: ['workflows', 'runners'],
        details: {
          definition: 'CI/CD platform that automates build, test, and deployment workflows.',
          examples: ['Automated testing', 'Deployment pipelines', 'Code quality checks'],
          bestPractices: [
            'Use matrix builds for multiple environments',
            'Cache dependencies for faster builds',
            'Use secrets for sensitive data',
            'Implement proper error handling'
          ],
          resources: [
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions' },
            { title: 'CI/CD Best Practices', url: 'https://docs.github.com/en/actions/learn-github-actions' }
          ]
        }
      },
      'infrastructure-code': {
        id: 'infrastructure-code',
        title: 'Infrastructure as Code',
        icon: '🧩',
        level: 'Root',
        type: 'root',
        position: { x: 800, y: 100 },
        status: 'in-progress',
        children: ['cloudformation', 'terraform'],
        details: {
          definition: 'Managing and provisioning infrastructure through machine-readable definition files.',
          examples: ['CloudFormation templates', 'Terraform configurations', 'Ansible playbooks'],
          bestPractices: [
            'Version control all infrastructure code',
            'Use modules for reusability',
            'Implement proper testing',
            'Document all resources'
          ],
          resources: [
            { title: 'IaC Best Practices', url: 'https://aws.amazon.com/what-is/iac/' },
            { title: 'CloudFormation Guide', url: 'https://docs.aws.amazon.com/cloudformation/' }
          ]
        }
      },
      'cloudformation': {
        id: 'cloudformation',
        title: 'CloudFormation',
        icon: '📋',
        level: 'Core',
        type: 'tool',
        position: { x: 750, y: 250 },
        status: 'completed',
        parent: 'infrastructure-code',
        children: ['cfn-templates', 'cfn-stacks'],
        details: {
          definition: 'AWS service for modeling and provisioning AWS resources using templates.',
          examples: ['VPC creation', 'Multi-tier applications', 'Auto Scaling groups'],
          bestPractices: [
            'Use parameters for reusability',
            'Implement proper resource naming',
            'Use outputs for cross-stack references',
            'Validate templates before deployment'
          ],
          resources: [
            { title: 'CloudFormation User Guide', url: 'https://docs.aws.amazon.com/cloudformation/' },
            { title: 'Template Reference', url: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html' }
          ]
        }
      },
      'terraform': {
        id: 'terraform',
        title: 'Terraform',
        icon: '🏗️',
        level: 'Core',
        type: 'tool',
        position: { x: 850, y: 250 },
        status: 'in-progress',
        parent: 'infrastructure-code',
        children: ['tf-modules', 'tf-state'],
        details: {
          definition: 'Infrastructure as Code tool for building, changing, and versioning infrastructure.',
          examples: ['Multi-cloud deployments', 'Resource provisioning', 'Infrastructure automation'],
          bestPractices: [
            'Use remote state storage',
            'Implement state locking',
            'Use modules for reusability',
            'Plan before applying changes'
          ],
          resources: [
            { title: 'Terraform Documentation', url: 'https://www.terraform.io/docs' },
            { title: 'Terraform Best Practices', url: 'https://www.terraform.io/docs/cloud/guides/recommended-practices/' }
          ]
        }
      },
      'monitoring': {
        id: 'monitoring',
        title: 'Monitoring & Logging',
        icon: '📊',
        level: 'Root',
        type: 'root',
        position: { x: 200, y: 300 },
        status: 'completed',
        children: ['cloudwatch', 'datadog'],
        details: {
          definition: 'Observability tools for tracking application and infrastructure performance.',
          examples: ['CloudWatch metrics', 'Datadog dashboards', 'Log aggregation'],
          bestPractices: [
            'Set up proactive alerting',
            'Create meaningful dashboards',
            'Implement distributed tracing',
            'Monitor business metrics'
          ],
          resources: [
            { title: 'CloudWatch Documentation', url: 'https://docs.aws.amazon.com/cloudwatch/' },
            { title: 'Monitoring Best Practices', url: 'https://aws.amazon.com/cloudwatch/getting-started/' }
          ]
        }
      },
      'cloudwatch': {
        id: 'cloudwatch',
        title: 'CloudWatch',
        icon: '📈',
        level: 'Core',
        type: 'service',
        position: { x: 150, y: 450 },
        status: 'completed',
        parent: 'monitoring',
        children: ['cw-metrics', 'cw-alarms'],
        details: {
          definition: 'AWS monitoring service for collecting metrics, logs, and events.',
          examples: ['EC2 CPU monitoring', 'Application logs', 'Custom metrics'],
          bestPractices: [
            'Set up meaningful alarms',
            'Use custom metrics for business KPIs',
            'Implement log retention policies',
            'Create operational dashboards'
          ],
          resources: [
            { title: 'CloudWatch User Guide', url: 'https://docs.aws.amazon.com/cloudwatch/' },
            { title: 'CloudWatch Best Practices', url: 'https://aws.amazon.com/cloudwatch/getting-started/' }
          ]
        }
      },
      'datadog': {
        id: 'datadog',
        title: 'Datadog',
        icon: '🐶',
        level: 'Core',
        type: 'service',
        position: { x: 250, y: 450 },
        status: 'completed',
        parent: 'monitoring',
        children: ['dd-apm', 'dd-dashboards'],
        details: {
          definition: 'Cloud monitoring platform for infrastructure, applications, and logs.',
          examples: ['APM tracing', 'Infrastructure monitoring', 'Log analytics'],
          bestPractices: [
            'Use tags for resource organization',
            'Implement SLOs and SLIs',
            'Create composite monitors',
            'Set up alert fatigue reduction'
          ],
          resources: [
            { title: 'Datadog Documentation', url: 'https://docs.datadoghq.com/' },
            { title: 'Monitoring Best Practices', url: 'https://www.datadoghq.com/blog/monitoring-101-collecting-data/' }
          ]
        }
      },
      'security': {
        id: 'security',
        title: 'Security & IAM',
        icon: '🔒',
        level: 'Root',
        type: 'root',
        position: { x: 500, y: 300 },
        status: 'completed',
        children: ['iam-roles', 'vpc-security'],
        details: {
          definition: 'Identity and Access Management plus security best practices.',
          examples: ['IAM roles and policies', 'VPC security groups', 'Encryption at rest'],
          bestPractices: [
            'Principle of least privilege',
            'Use IAM roles instead of users',
            'Enable MFA for all accounts',
            'Regular security audits'
          ],
          resources: [
            { title: 'IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
            { title: 'AWS Security', url: 'https://aws.amazon.com/security/' }
          ]
        }
      },
      'iam-roles': {
        id: 'iam-roles',
        title: 'IAM Roles',
        icon: '👤',
        level: 'Core',
        type: 'feature',
        position: { x: 450, y: 450 },
        status: 'completed',
        parent: 'security',
        children: ['role-policies', 'assume-role'],
        details: {
          definition: 'IAM identity with permissions that determine what the identity can and cannot do.',
          examples: ['EC2 instance roles', 'Lambda execution roles', 'Cross-account access'],
          bestPractices: [
            'Use roles instead of users for applications',
            'Implement least privilege principle',
            'Use managed policies when possible',
            'Regular role and policy audits'
          ],
          resources: [
            { title: 'IAM Roles Guide', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html' },
            { title: 'IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }
          ]
        }
      },
      'vpc-security': {
        id: 'vpc-security',
        title: 'VPC Security',
        icon: '🌐',
        level: 'Core',
        type: 'feature',
        position: { x: 550, y: 450 },
        status: 'completed',
        parent: 'security',
        children: ['nacls', 'vpc-endpoints'],
        details: {
          definition: 'Virtual Private Cloud security features for network isolation and protection.',
          examples: ['Private subnets', 'NAT gateways', 'VPC endpoints'],
          bestPractices: [
            'Use private subnets for databases',
            'Implement defense in depth',
            'Use VPC Flow Logs for monitoring',
            'Segment networks by function'
          ],
          resources: [
            { title: 'VPC Security Guide', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html' },
            { title: 'Network Security', url: 'https://aws.amazon.com/vpc/security/' }
          ]
        }
      },
      'cost-management': {
        id: 'cost-management',
        title: 'Cost Management',
        icon: '💰',
        level: 'Root',
        type: 'root',
        position: { x: 800, y: 300 },
        status: 'in-progress',
        children: ['cost-explorer', 'budgets'],
        details: {
          definition: 'Tools and strategies for optimizing AWS costs and spending.',
          examples: ['Cost Explorer analysis', 'Budget alerts', 'Reserved instances'],
          bestPractices: [
            'Set up billing alerts',
            'Use appropriate instance types',
            'Implement auto-scaling',
            'Regular cost reviews'
          ],
          resources: [
            { title: 'Cost Management', url: 'https://aws.amazon.com/aws-cost-management/' },
            { title: 'Cost Optimization', url: 'https://aws.amazon.com/economics/' }
          ]
        }
      }
      'cost-explorer': {
        id: 'cost-explorer',
        title: 'Cost Explorer',
        icon: '🔍',
        level: 'Core',
        type: 'tool',
        position: { x: 750, y: 450 },
        status: 'completed',
        parent: 'cost-management',
        children: ['cost-reports', 'ri-recommendations'],
        details: {
          definition: 'AWS tool for visualizing, understanding, and managing AWS costs and usage.',
          examples: ['Monthly cost analysis', 'Service-level spending', 'Trend identification'],
          bestPractices: [
            'Review costs monthly',
            'Use cost allocation tags',
            'Set up cost anomaly detection',
            'Analyze usage patterns'
          ],
          resources: [
            { title: 'Cost Explorer Guide', url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html' },
            { title: 'Cost Optimization', url: 'https://aws.amazon.com/aws-cost-management/aws-cost-explorer/' }
          ]
        }
      },
      'budgets': {
        id: 'budgets',
        title: 'AWS Budgets',
        icon: '💳',
        level: 'Core',
        type: 'tool',
        position: { x: 850, y: 450 },
        status: 'in-progress',
        parent: 'cost-management',
        children: ['budget-alerts', 'budget-actions'],
        details: {
          definition: 'Service to set custom cost and usage budgets with alerts.',
          examples: ['Monthly spending limits', 'Service-specific budgets', 'Usage-based budgets'],
          bestPractices: [
            'Set realistic budget thresholds',
            'Use multiple alert levels',
            'Implement automated actions',
            'Monitor budget performance'
          ],
          resources: [
            { title: 'AWS Budgets Guide', url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html' },
            { title: 'Budget Best Practices', url: 'https://aws.amazon.com/aws-cost-management/aws-budgets/' }
          ]
        }
      }
    };
  }

  renderTree() {
    if (!this.canvas) return;
    
    this.canvas.innerHTML = '';
    this.nodes.clear();
    this.connections = [];

    // Render nodes
    Object.values(this.treeData).forEach(nodeData => {
      this.createNode(nodeData);
    });

    // Render connections
    this.createConnections();
  }

  createNode(nodeData) {
    const node = document.createElement('div');
    node.className = `tree-node ${nodeData.type} ${nodeData.status}`;
    node.id = `node-${nodeData.id}`;
    node.style.left = `${nodeData.position.x}px`;
    node.style.top = `${nodeData.position.y}px`;

    const statusIcon = this.getStatusIcon(nodeData.status);
    
    node.innerHTML = `
      <span class="node-icon">${nodeData.icon}</span>
      <div class="node-title">${nodeData.title}</div>
      <div class="node-level">${nodeData.level}</div>
      ${statusIcon ? `<div class="node-status">${statusIcon}</div>` : ''}
    `;

    node.addEventListener('click', () => this.selectNode(nodeData.id));
    
    this.canvas.appendChild(node);
    this.nodes.set(nodeData.id, { element: node, data: nodeData });
  }

  getStatusIcon(status) {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⚡';
      case 'locked': return '🔒';
      default: return null;
    }
  }

  createConnections() {
    Object.values(this.treeData).forEach(nodeData => {
      if (nodeData.children) {
        nodeData.children.forEach(childId => {
          const childData = this.treeData[childId];
          if (childData) {
            this.createConnection(nodeData, childData);
          }
        });
      }
    });
  }

  createConnection(parentData, childData) {
    const line = document.createElement('div');
    line.className = 'connection-line';
    
    const parentPos = parentData.position;
    const childPos = childData.position;
    
    const deltaX = childPos.x - parentPos.x;
    const deltaY = childPos.y - parentPos.y;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    line.style.left = `${parentPos.x + 60}px`;
    line.style.top = `${parentPos.y + 30}px`;
    line.style.width = `${length - 60}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    this.canvas.appendChild(line);
    this.connections.push(line);
  }

  selectNode(nodeId) {
    const nodeInfo = this.nodes.get(nodeId);
    if (!nodeInfo) return;

    // Update visual selection
    this.nodes.forEach(({ element }) => element.classList.remove('selected'));
    nodeInfo.element.classList.add('selected');
    
    this.selectedNode = nodeId;
    this.showNodeDetails(nodeInfo.data);
    
    // Animate node selection
    nodeInfo.element.style.animation = 'levelUp 0.6s ease';
    setTimeout(() => {
      nodeInfo.element.style.animation = '';
    }, 600);
  }

  showNodeDetails(nodeData) {
    const panel = this.detailPanel;
    const title = document.getElementById('panel-title');
    const content = document.getElementById('panel-content');
    
    if (!panel || !title || !content) return;

    title.innerHTML = `${nodeData.icon} ${nodeData.title}`;
    
    const details = nodeData.details;
    content.innerHTML = `
      <div class="detail-section">
        <h4 class="detail-heading">📖 Definition</h4>
        <p class="detail-text">${details.definition}</p>
      </div>
      
      <div class="detail-section">
        <h4 class="detail-heading">💡 Examples</h4>
        <ul class="detail-list">
          ${details.examples.map(example => `<li>${example}</li>`).join('')}
        </ul>
      </div>
      
      <div class="detail-section">
        <h4 class="detail-heading">⭐ Best Practices</h4>
        <ul class="detail-list">
          ${details.bestPractices.map(practice => `<li>${practice}</li>`).join('')}
        </ul>
      </div>
      
      ${details.codeExample ? `
        <div class="detail-section">
          <h4 class="detail-heading">💻 Example Configuration</h4>
          <div class="code-example">${details.codeExample.replace(/\n/g, '<br>')}</div>
        </div>
      ` : ''}
      
      <div class="detail-section">
        <h4 class="detail-heading">🔗 Resources</h4>
        <div class="resource-links">
          ${details.resources.map(resource => 
            `<a href="${resource.url}" target="_blank" class="resource-link">
              <span>🌐</span> ${resource.title}
            </a>`
          ).join('')}
        </div>
      </div>
    `;
    
    panel.classList.remove('hidden');
  }

  hideNodeDetails() {
    this.detailPanel?.classList.add('hidden');
    this.nodes.forEach(({ element }) => element.classList.remove('selected'));
    this.selectedNode = null;
  }

  expandAll() {
    this.nodes.forEach(({ element }) => {
      element.classList.add('expanded');
    });
    this.connections.forEach(line => {
      line.classList.add('active');
    });
  }

  collapseAll() {
    this.nodes.forEach(({ element }) => {
      element.classList.remove('expanded', 'selected');
    });
    this.connections.forEach(line => {
      line.classList.remove('active');
    });
    this.hideNodeDetails();
  }

  resetView() {
    this.collapseAll();
    if (this.canvas) {
      this.canvas.style.transform = 'scale(1) translate(0, 0)';
    }
  }

  setupEventListeners() {
    // Tree controls
    document.getElementById('expand-all')?.addEventListener('click', () => this.expandAll());
    document.getElementById('collapse-all')?.addEventListener('click', () => this.collapseAll());
    document.getElementById('reset-view')?.addEventListener('click', () => this.resetView());
    
    // Panel close
    document.getElementById('panel-close')?.addEventListener('click', () => this.hideNodeDetails());
    
    // Click outside to close panel
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.detail-panel') && !e.target.closest('.tree-node')) {
        this.hideNodeDetails();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideNodeDetails();
      }
    });
  }
}

// Learning Path Highlighting
function highlightPath(pathType) {
  const skillTree = window.skillTree;
  if (!skillTree) return;
  
  skillTree.collapseAll();
  
  // Define learning paths
  const paths = {
    'aws': ['aws', 'ec2', 'security-groups', 'inbound-rules'],
    'devops': ['devops-tools', 'docker', 'ansible', 'github-actions'],
    'security': ['security', 'iam-roles', 'vpc-security']
  };
  
  const pathNodes = paths[pathType] || [];
  
  // Highlight path nodes with delay
  pathNodes.forEach((nodeId, index) => {
    setTimeout(() => {
      const nodeInfo = skillTree.nodes.get(nodeId);
      if (nodeInfo) {
        nodeInfo.element.classList.add('expanded');
        nodeInfo.element.style.animation = 'nodeUnlock 0.5s ease';
        setTimeout(() => {
          nodeInfo.element.style.animation = '';
        }, 500);
      }
    }, index * 300);
  });
  
  // Show notification
  const notification = document.createElement('div');
  notification.className = 'path-notification';
  notification.innerHTML = `
    <span class="notification-icon">🎯</span>
    <span>Highlighting ${pathType.toUpperCase()} learning path</span>
  `;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: var(--glass-bg);
    border: 1px solid var(--accent-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    color: var(--accent-primary);
    z-index: 1001;
    animation: slideInRight 0.5s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Initialize Skill Tree
document.addEventListener('DOMContentLoaded', () => {
  window.skillTree = new SkillTree();
});

// Add notification animations
const notificationCSS = `
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationCSS;
document.head.appendChild(styleSheet);