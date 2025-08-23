// aws-quiz.js — Clean version

class AWSQuiz {
  // constant for exam subset size
  static EXAM_QUESTIONS = 15;

  constructor() {
    // State
    this.questions = [];
    this.bank = null; // full pool snapshot
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.mode = 'practice';
    this.playerName = '';
    this.timeRemaining = null;
    this.timer = null;
    this.startTime = null;

    // Endpoint from DOM (no hardcoding)
    this.saveUrl = document.getElementById('endpoints')?.dataset.save || '/aws-practice';

    // Init
    this.loadQuestions();                // <-- keep your question bank here
    this.initializeEventListeners();
    this.loadHighScore();

    // Set dashboard total to full pool on load
    const totalStat = document.getElementById('total-questions');
    if (totalStat) totalStat.textContent = String(this.questions.length);
  }

// -----------------------------
// Data
// -----------------------------
loadQuestions() {
  this.questions = [
    // --- your original 15 ---
    {
      question: "Which AWS service provides a managed NoSQL database?",
      options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
      correct: 1,
      explanation: "Amazon DynamoDB is AWS's managed NoSQL database service that provides fast and predictable performance with seamless scalability."
    },
    {
      question: "What is the AWS Well-Architected Framework pillar that focuses on the ability to recover from failures?",
      options: ["Performance Efficiency", "Cost Optimization", "Reliability", "Security"],
      correct: 2,
      explanation: "The Reliability pillar focuses on the ability of a system to recover from infrastructure or service disruptions and dynamically acquire computing resources to meet demand."
    },
    {
      question: "Which AWS service is used for content delivery and caching?",
      options: ["Amazon S3", "Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect"],
      correct: 1,
      explanation: "Amazon CloudFront is a content delivery network (CDN) service that delivers data globally with low latency."
    },
    {
      question: "What does the 'S' in Amazon S3 stand for?",
      options: ["Secure", "Simple", "Scalable", "Storage"],
      correct: 1,
      explanation: "Amazon S3 stands for Simple Storage Service."
    },
    {
      question: "Which AWS service provides virtual servers in the cloud?",
      options: ["AWS Lambda", "Amazon ECS", "Amazon EC2", "AWS Fargate"],
      correct: 2,
      explanation: "Amazon EC2 provides resizable compute capacity in the cloud."
    },
    {
      question: "What is the AWS pricing model that allows you to pay only for what you use?",
      options: ["Reserved Instances", "Spot Instances", "Pay-as-you-go", "Dedicated Hosts"],
      correct: 2,
      explanation: "Pay-as-you-go means you pay only for the services you consume."
    },
    {
      question: "Which AWS service is used for monitoring and observability?",
      options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS X-Ray"],
      correct: 1,
      explanation: "Amazon CloudWatch collects metrics, logs, and events for observability."
    },
    {
      question: "What is the maximum size of an object that can be stored in Amazon S3?",
      options: ["5 GB", "5 TB", "100 GB", "1 TB"],
      correct: 1,
      explanation: "S3 maximum single object size is 5 TB."
    },
    {
      question: "Which AWS service provides a managed relational database?",
      options: ["Amazon DynamoDB", "Amazon RDS", "Amazon Redshift", "Amazon DocumentDB"],
      correct: 1,
      explanation: "Amazon RDS manages relational database engines like MySQL, PostgreSQL, and more."
    },
    {
      question: "What does AWS IAM stand for?",
      options: [
        "Identity and Access Management",
        "Infrastructure and Application Monitoring",
        "Internet and API Management",
        "Integration and Automation Management"
      ],
      correct: 0,
      explanation: "IAM = Identity and Access Management."
    },
    {
      question: "Which AWS service is used for serverless computing?",
      options: ["Amazon EC2", "AWS Lambda", "Amazon ECS", "AWS Batch"],
      correct: 1,
      explanation: "AWS Lambda runs code without provisioning or managing servers."
    },
    {
      question: "What is the AWS global infrastructure component that consists of one or more data centers?",
      options: ["Region", "Availability Zone", "Edge Location", "Local Zone"],
      correct: 1,
      explanation: "An Availability Zone is one or more discrete data centers in a Region."
    },
    {
      question: "Which AWS service provides DNS services?",
      options: ["Amazon CloudFront", "AWS Direct Connect", "Amazon Route 53", "Amazon VPC"],
      correct: 2,
      explanation: "Amazon Route 53 is AWS's scalable DNS web service."
    },
    {
      question: "What is the AWS shared responsibility model?",
      options: [
        "AWS is responsible for everything",
        "Customer is responsible for everything",
        "AWS and customer share security responsibilities",
        "Only applies to enterprise customers"
      ],
      correct: 2,
      explanation: "AWS secures the cloud; customers secure what they put in the cloud."
    },
    {
      question: "Which AWS service is used for data warehousing?",
      options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
      correct: 2,
      explanation: "Amazon Redshift is a fully managed data warehouse."
    },

    // --- 25 new questions below ---

    {
      question: "Which S3 storage class is best for long-lived, infrequently accessed data but requires milliseconds access?",
      options: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Glacier Instant Retrieval", "S3 Glacier Deep Archive"],
      correct: 2,
      explanation: "Glacier Instant Retrieval provides low-latency access for infrequent data at lower cost."
    },
    {
      question: "Security Groups vs NACLs: which one is stateful?",
      options: ["Network ACLs", "Security Groups", "Both", "Neither"],
      correct: 1,
      explanation: "Security Groups are stateful; NACLs are stateless."
    },
    {
      question: "Which service lets you create isolated virtual networks within AWS?",
      options: ["AWS Direct Connect", "Amazon VPC", "Amazon Route 53", "Amazon EKS"],
      correct: 1,
      explanation: "Amazon VPC lets you define your own virtual private cloud."
    },
    {
      question: "Which ELB type is best for HTTP/HTTPS with advanced routing features?",
      options: ["Classic Load Balancer", "Network Load Balancer", "Gateway Load Balancer", "Application Load Balancer"],
      correct: 3,
      explanation: "ALB provides layer-7 routing, path-based and host-based rules."
    },
    {
      question: "What does Multi-AZ in Amazon RDS primarily provide?",
      options: ["Read scaling", "Automatic backups", "High availability and failover", "Performance tuning"],
      correct: 2,
      explanation: "Multi-AZ provides HA/DR; Read Replicas are for read scaling."
    },
    {
      question: "Which service centralizes account management and consolidated billing across multiple AWS accounts?",
      options: ["AWS Organizations", "AWS Control Tower", "AWS Budgets", "Cost Explorer"],
      correct: 0,
      explanation: "AWS Organizations manages multiple accounts and consolidated billing."
    },
    {
      question: "Which service provides DDoS protection at the edge for AWS resources?",
      options: ["AWS Shield", "AWS WAF", "Amazon GuardDuty", "AWS Firewall Manager"],
      correct: 0,
      explanation: "AWS Shield (Standard/Advanced) provides DDoS protections."
    },
    {
      question: "Which service should you use to define infrastructure as code templates?",
      options: ["AWS CloudFormation", "AWS Elastic Beanstalk", "AWS CodeDeploy", "AWS CodePipeline"],
      correct: 0,
      explanation: "CloudFormation models and provisions AWS resources with templates."
    },
    {
      question: "What is the best option to decouple microservices with reliable, scalable message queuing?",
      options: ["Amazon SNS", "Amazon MQ", "Amazon SQS", "AWS Step Functions"],
      correct: 2,
      explanation: "SQS provides durable, scalable message queues."
    },
    {
      question: "Which feature allows Lambda functions in a VPC to access S3 privately without an Internet Gateway?",
      options: ["NAT Gateway", "VPC Peering", "Gateway VPC Endpoint", "Interface VPC Endpoint"],
      correct: 2,
      explanation: "S3 uses Gateway VPC Endpoints for private access."
    },
    {
      question: "Which tool helps you get cost-optimization and best practice recommendations?",
      options: ["AWS Trusted Advisor", "AWS License Manager", "AWS Budgets", "Cost Explorer"],
      correct: 0,
      explanation: "Trusted Advisor checks for cost, performance, security, and fault tolerance."
    },
    {
      question: "You need a managed Kubernetes control plane on AWS. Choose:",
      options: ["Amazon ECS", "AWS Fargate", "Amazon EKS", "AWS Batch"],
      correct: 2,
      explanation: "Amazon EKS is the managed Kubernetes service."
    },
    {
      question: "Which Route 53 routing policy sends traffic to resources based on latency to the user?",
      options: ["Weighted", "Latency-based", "Geolocation", "Failover"],
      correct: 1,
      explanation: "Latency-based routing directs users to the region with the lowest latency."
    },
    {
      question: "What’s the simplest way to host a static website at scale with low latency worldwide?",
      options: ["EC2 with Nginx", "S3 + CloudFront", "Elastic Beanstalk", "ECS Fargate"],
      correct: 1,
      explanation: "S3 for static hosting and CloudFront for global caching and low latency."
    },
    {
      question: "Which storage is shared, elastic, and supports NFS for Linux instances?",
      options: ["Amazon EBS", "Amazon EFS", "Instance Store", "Amazon FSx for Windows"],
      correct: 1,
      explanation: "EFS is a scalable, shared NFS file system."
    },
    {
      question: "Which service records API calls made in your AWS account?",
      options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "Amazon Inspector"],
      correct: 0,
      explanation: "CloudTrail logs API calls and account activity."
    },
    {
      question: "What’s the best way to enforce permission guardrails across member accounts?",
      options: ["IAM Inline Policies", "Permission Boundaries", "Organizations SCPs", "Resource Policies"],
      correct: 2,
      explanation: "Service Control Policies (SCPs) set maximum permissions across accounts."
    },
    {
      question: "Which EC2 pricing option is most cost-effective for fault-tolerant, flexible workloads?",
      options: ["On-Demand", "Reserved Instances", "Spot Instances", "Dedicated Hosts"],
      correct: 2,
      explanation: "Spot Instances offer steep discounts when your app tolerates interruption."
    },
    {
      question: "Which service helps create workflows with steps and retries between microservices?",
      options: ["AWS Step Functions", "Amazon SQS", "Amazon SNS", "AWS Glue"],
      correct: 0,
      explanation: "Step Functions orchestrates serverless workflows with state machines."
    },
    {
      question: "S3 default encryption at rest using keys managed by AWS is called:",
      options: ["SSE-C", "SSE-S3", "SSE-KMS", "Client-side encryption"],
      correct: 1,
      explanation: "SSE-S3 uses keys managed by S3 on your behalf."
    },
    {
      question: "To stream and analyze real-time data ingestion at scale, use:",
      options: ["Amazon SQS", "Amazon Kinesis Data Streams", "Amazon EMR", "AWS Glue"],
      correct: 1,
      explanation: "Kinesis Data Streams ingests and processes real-time streaming data."
    },
    {
      question: "Which database service is purpose-built for petabyte-scale analytics with standard SQL?",
      options: ["Amazon RDS", "Amazon Neptune", "Amazon Redshift", "Amazon DocumentDB"],
      correct: 2,
      explanation: "Redshift is the analytical data warehouse with SQL interfaces."
    },
    {
      question: "Which service scans EC2 instances for software vulnerabilities?",
      options: ["Amazon Inspector", "AWS Shield", "Amazon GuardDuty", "AWS WAF"],
      correct: 0,
      explanation: "Amazon Inspector assesses EC2 and ECR images for vulnerabilities."
    },
    {
      question: "For web ACLs with rules like IP match, rate-based, or managed rule groups, use:",
      options: ["AWS Shield Advanced", "AWS WAF", "AWS Firewall Manager", "Security Groups"],
      correct: 1,
      explanation: "AWS WAF is a web application firewall for layer-7 protections."
    },
    {
      question: "Which service lets you run containers without managing servers or clusters?",
      options: ["Amazon EKS", "Amazon ECS on EC2", "AWS Fargate", "Amazon Lightsail"],
      correct: 2,
      explanation: "Fargate is serverless compute for containers."
    },
    {
      question: "Which feature helps reduce S3 costs by moving objects between storage classes over time?",
      options: ["S3 Versioning", "S3 Lifecycle Policies", "S3 Replication", "S3 Event Notifications"],
      correct: 1,
      explanation: "Lifecycle policies transition or expire objects automatically."
    },
    {
      question: "What’s the simplest way to define and deploy serverless apps via declarative templates?",
      options: ["AWS Proton", "AWS SAM", "AWS Copilot", "AWS Beanstalk"],
      correct: 1,
      explanation: "AWS SAM extends CloudFormation for serverless applications."
    },
    {
      question: "Which database is graph-optimized for relationships and graph queries?",
      options: ["Amazon Aurora", "Amazon Neptune", "Amazon Timestream", "Amazon QLDB"],
      correct: 1,
      explanation: "Amazon Neptune is a fast, reliable graph database service."
    },
    {
      question: "Which service provides managed Microsoft Active Directory in AWS?",
      options: ["AWS Directory Service for Microsoft AD", "Amazon Cognito", "IAM Identity Center", "AWS Single Sign-On (legacy)"],
      correct: 0,
      explanation: "Directory Service for Microsoft AD provides a managed AD in the cloud."
    },
    {
      question: "How do you give an EC2 instance temporary credentials to access S3 without storing keys?",
      options: ["IAM User Access Keys", "Instance Profile (IAM Role)", "KMS Key Policy", "Bucket ACL"],
      correct: 1,
      explanation: "Attach an IAM role via an instance profile for temporary, rotated credentials."
    },
    {
      question: "Which service provides near real-time threat detection using account activity and VPC flow logs?",
      options: ["AWS Shield", "Amazon GuardDuty", "AWS Firewall Manager", "AWS Config"],
      correct: 1,
      explanation: "GuardDuty analyzes logs and detects suspicious activity."
    },
    {
      question: "Which S3 feature blocks public access at the bucket and account level?",
      options: ["Bucket Policies", "ACLs", "S3 Block Public Access", "VPC Endpoint Policies"],
      correct: 2,
      explanation: "S3 Block Public Access provides blanket controls to prevent public exposure."
    },
    {
      question: "For relational DB read scaling with eventually consistent reads, choose:",
      options: ["RDS Multi-AZ", "RDS Read Replicas", "Aurora Backtrack", "DynamoDB DAX"],
      correct: 1,
      explanation: "Read Replicas add read throughput; Multi-AZ is for availability."
    },
    {
      question: "Which service helps schedule one-off or cron-like invocations of targets (Lambda, Step Functions)?",
      options: ["Amazon SQS", "Amazon EventBridge (CloudWatch Events)", "AWS Batch", "Amazon MQ"],
      correct: 1,
      explanation: "EventBridge rules can run on schedules and route to many targets."
    },
    {
      question: "What is the best practice for distributing traffic across multiple AZs for EC2?",
      options: ["Use Route 53 only", "Use an ALB or NLB in multiple AZs", "Use a single EC2 with Elastic IP", "Use S3 Static Website"],
      correct: 1,
      explanation: "A load balancer across AZs improves availability and distribution."
    },
    {
      question: "Which EBS volume type is best for low-latency, bursty transactional workloads at low cost?",
      options: ["Throughput Optimized HDD (st1)", "Cold HDD (sc1)", "General Purpose SSD (gp3)", "Provisioned IOPS SSD (io2)"],
      correct: 2,
      explanation: "gp3 provides solid performance at a low price for general workloads."
    },
    {
      question: "Which service provides managed streaming for Apache Kafka?",
      options: ["Amazon Kinesis Data Streams", "Amazon MSK", "Amazon EMR", "AWS Glue"],
      correct: 1,
      explanation: "Amazon MSK is the managed Kafka service."
    },
    {
      question: "Which option provides object-level immutability for compliance in S3?",
      options: ["S3 Lifecycle", "S3 Replication", "S3 Object Lock", "S3 Intelligent-Tiering"],
      correct: 2,
      explanation: "S3 Object Lock enforces WORM to prevent object changes or deletion."
    }
  ];

  // keep dashboard counter in sync (if present)
  const totalEl = document.getElementById('total-questions');
  if (totalEl) totalEl.textContent = this.questions.length;
}


  // -----------------------------
  // UI Wiring
  // -----------------------------
  initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }

    // Mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    // Leaderboard tabs (kept even if only exam is shown)
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.switchLeaderboardTab(e.target.dataset.tab);
      });
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
  }

  // -----------------------------
  // Quiz Flow
  // -----------------------------

  // Helper: ask for player name just-in-time
  ensurePlayerName() {
    let name = window.prompt('Enter your name to begin:', '')?.trim();
    if (!name) return null; // cancelled or blank

    // Optional: cap length & strip control chars
    name = name.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 64);
    return name;
  }

  startQuiz(mode) {
    // prompt for name *after* clicking Start
    const name = this.ensurePlayerName();
    if (!name) return; // user cancelled; do nothing

    // Initialize state
    this.playerName = name;
    this.mode = mode;
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();

    // Build a stable question bank once
    if (!this.bank || !Array.isArray(this.bank) || this.bank.length === 0) {
      this.bank = this.questions.slice(); // snapshot the full pool once
    }

    // Fresh copy + shuffle
    this.questions = this.bank.slice();
    this.shuffleQuestions();

    // Exam uses a subset; Practice uses the full pool
    if (mode === 'exam') {
      const n = Math.min(this.questions.length, AWSQuiz.EXAM_QUESTIONS);
      this.questions = this.questions.slice(0, n);
    }

    // Update counters
    const totalStat = document.getElementById('total-questions');
    if (totalStat) totalStat.textContent = String(this.questions.length);
    const totalDisplay = document.getElementById('total-questions-display');
    if (totalDisplay) totalDisplay.textContent = String(this.questions.length);

    // Timer setup
    const timerEl = document.getElementById('quiz-timer');
    timerEl?.classList.remove('timer-warning'); // clear old state
    if (mode === 'exam') {
      this.timeRemaining = 90 * 60; // 90 minutes
      if (timerEl) timerEl.style.display = '';
      this.startTimer();
    } else {
      this.timeRemaining = null;
      if (timerEl) timerEl.style.display = 'none';
    }

    // Swap views
    document.getElementById('quiz-dashboard')?.classList.add('hidden');
    document.getElementById('quiz-container')?.classList.remove('hidden');

    // First render
    this.displayQuestion();
    this.updateProgress();
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();
      if (this.timeRemaining <= 0) this.submitQuiz();
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const timerText = document.getElementById('time-remaining');
    if (timerText) timerText.textContent = timeString;

    const timerEl = document.getElementById('quiz-timer');
    if (timerEl && this.timeRemaining < 300) timerEl.classList.add('timer-warning'); // <5 mins
  }

  displayQuestion() {
    const q = this.questions[this.currentQuestion];
    const qNum = document.getElementById('question-num');
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('question-options');

    if (qNum) qNum.textContent = this.currentQuestion + 1;
    if (qText) qText.textContent = q.question;
    if (optionsContainer) optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'option';
      wrapper.innerHTML = `
        <input type="radio" id="option-${idx}" name="answer" value="${idx}">
        <label for="option-${idx}">${opt}</label>
      `;
      wrapper.addEventListener('click', () => this.selectOption(idx));
      optionsContainer.appendChild(wrapper);
    });

    // nav buttons
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    const submitBtn = document.getElementById('submit-button');

    if (prevBtn) prevBtn.disabled = this.currentQuestion === 0;
    if (nextBtn) nextBtn.disabled = true;

    const isLast = this.currentQuestion === this.questions.length - 1;
    if (nextBtn) nextBtn.style.display = isLast ? 'none' : 'inline-block';
    if (submitBtn) submitBtn.style.display = isLast ? 'inline-block' : 'none';

    // hide explanation on question change
    document.getElementById('explanation-card')?.classList.add('hidden');

    // restore selection if previously answered
    if (this.answers[this.currentQuestion] !== undefined) {
      this.selectOption(this.answers[this.currentQuestion], false);
    }
  }

  selectOption(index, updateAnswer = true) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    const selected = document.querySelectorAll('.option')[index];
    if (selected) selected.classList.add('selected');

    const radio = document.getElementById(`option-${index}`);
    if (radio) radio.checked = true;

    if (updateAnswer) this.answers[this.currentQuestion] = index;

    const nextBtn = document.getElementById('next-button');
    const submitBtn = document.getElementById('submit-button');
    if (nextBtn) nextBtn.disabled = false;
    if (submitBtn) submitBtn.disabled = false;

    if (this.mode === 'practice') this.showExplanation();
  }

  showExplanation() {
    const q = this.questions[this.currentQuestion];
    const card = document.getElementById('explanation-card');
    const text = document.getElementById('explanation-text');
    if (!card || !text) return;

    const isCorrect = this.answers[this.currentQuestion] === q.correct;
    text.innerHTML = `
      <div class="explanation-result ${isCorrect ? 'correct' : 'incorrect'}">
        <span class="result-icon">${isCorrect ? '✅' : '❌'}</span>
        <span class="result-text">${isCorrect ? 'Correct!' : 'Incorrect'}</span>
      </div>
      <div class="explanation-content">
        <p><strong>Correct Answer:</strong> ${q.options[q.correct]}</p>
        <p>${q.explanation}</p>
      </div>
    `;
    card.classList.remove('hidden');
  }

  nextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.displayQuestion();
      this.updateProgress();
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.displayQuestion();
      this.updateProgress();
    }
  }

  updateProgress() {
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    const bar = document.getElementById('progress-fill');
    const cur = document.getElementById('current-question');
    const total = document.getElementById('total-questions-display');

    if (bar) bar.style.width = `${progress}%`;
    if (cur) cur.textContent = this.currentQuestion + 1;
    if (total) total.textContent = this.questions.length;
  }

  // -----------------------------
  // Finish & Persist
  // -----------------------------
async submitQuiz() {
  if (this.timer) clearInterval(this.timer);

  // Score
  let correct = 0;
  this.questions.forEach((q, i) => {
    if (this.answers[i] === q.correct) correct++;
  });
  this.score = Math.round((correct / this.questions.length) * 100);

  // Time taken mm:ss
  const ms = Date.now() - this.startTime;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const timeTaken = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Local high score
  this.updateHighScore();

  // Persist to backend
  try {
    const payload = new URLSearchParams();
    payload.set('player-name', this.playerName);
    payload.set('score', String(this.score));                // keep for compatibility
    payload.set('correct', String(correct));                 // NEW
    payload.set('total', String(this.questions.length));     // NEW
    payload.set('time', timeTaken);
    payload.set('quiz-mode', this.mode); // "exam" or "practice"

    const resp = await fetch(this.saveUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    });

    if (!resp.ok) {
      throw new Error(`Save failed: ${resp.status} ${resp.statusText}`);
    }

    // After saving, go to leaderboard and highlight this player
    const url = new URL(this.saveUrl, window.location.origin);
    url.searchParams.set('highlight', this.playerName);
    window.location.href = `${url.toString()}#leaderboard`;
    return; // navigating away
  } catch (e) {
    console.error('Failed to save result:', e);
    // Fallback: show local results if save failed
    this.showResults(correct, this.questions.length - correct, timeTaken);
  }
}

  showResults(correct, incorrect, timeTaken) {
    document.getElementById('quiz-container')?.classList.add('hidden');
    document.getElementById('results-container')?.classList.remove('hidden');

    const final = document.getElementById('final-score');
    const ok = document.getElementById('correct-answers');
    const ko = document.getElementById('incorrect-answers');
    const t = document.getElementById('time-taken');

    if (final) final.textContent = `${this.score}%`;
    if (ok) ok.textContent = correct;
    if (ko) ko.textContent = incorrect;
    if (t) t.textContent = timeTaken;

    const badge = document.getElementById('results-badge');
    if (badge) {
      const badgeIcon = badge.querySelector('.badge-icon');
      const badgeText = badge.querySelector('.badge-text');
      if (this.score >= 90) {
        if (badgeIcon) badgeIcon.textContent = '🏆';
        if (badgeText) badgeText.textContent = 'Excellent!';
        badge.className = 'results-badge excellent';
      } else if (this.score >= 70) {
        if (badgeIcon) badgeIcon.textContent = '🎉';
        if (badgeText) badgeText.textContent = 'Well Done!';
        badge.className = 'results-badge good';
      } else {
        if (badgeIcon) badgeIcon.textContent = '📚';
        if (badgeText) badgeText.textContent = 'Keep Learning!';
        badge.className = 'results-badge needs-improvement';
      }
    }
  }

  // -----------------------------
  // Misc
  // -----------------------------
  restartQuiz() {
    document.getElementById('results-container')?.classList.add('hidden');
    document.getElementById('quiz-dashboard')?.classList.remove('hidden');

    // reset dashboard counter to full bank on restart
    const totalStat = document.getElementById('total-questions');
    if (totalStat && this.bank?.length) {
      totalStat.textContent = String(this.bank.length);
    }
  }

  reviewAnswers() {
    alert('Review functionality coming soon!');
  }

  shareResults() {
    const text = `I just scored ${this.score}% on the AWS Cloud Practitioner practice test! 🚀 #AWS #CloudPractitioner`;
    if (navigator.share) {
      navigator.share({ title: 'AWS Practice Test Results', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Results copied to clipboard!'));
    }
  }

  updateHighScore() {
    const key = `aws-quiz-high-score-${this.mode}`;
    const current = Number(localStorage.getItem(key) || 0);
    if (this.score > current) localStorage.setItem(key, this.score);
    this.loadHighScore();
  }

  loadHighScore() {
    const hs = Number(localStorage.getItem('aws-quiz-high-score-practice') || 0);
    const el = document.getElementById('high-score');
    if (el) el.textContent = `${hs}%`;
  }

  switchLeaderboardTab(tab) {
    document.querySelectorAll('.leaderboard-tab').forEach(el => (el.style.display = 'none'));
    const active = document.getElementById(tab);
    if (active) active.style.display = 'block';
  }
}

// Global hooks for HTML onclick
function startQuiz(mode) { window.awsQuiz.startQuiz(mode); }
function nextQuestion() { window.awsQuiz.nextQuestion(); }
function previousQuestion() { window.awsQuiz.previousQuestion(); }
function submitQuiz() { window.awsQuiz.submitQuiz(); }
function restartQuiz() { window.awsQuiz.restartQuiz(); }
function reviewAnswers() { window.awsQuiz.reviewAnswers(); }
function shareResults() { window.awsQuiz.shareResults(); }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.awsQuiz = new AWSQuiz();
});
