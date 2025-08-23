// AWS Cloud Practitioner Quiz Game
class AWSQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.mode = 'practice';
        this.timeLimit = 90 * 60; // 90 minutes in seconds
        this.timeRemaining = this.timeLimit;
        this.timer = null;
        this.startTime = null;
        
        this.loadQuestions();
        this.initializeEventListeners();
        this.loadHighScore();
    }

    loadQuestions() {
        // AWS Cloud Practitioner sample questions
        this.questions = [
            {
                question: "Which AWS service provides a managed NoSQL database?",
                options: [
                    "Amazon RDS",
                    "Amazon DynamoDB", 
                    "Amazon Redshift",
                    "Amazon Aurora"
                ],
                correct: 1,
                explanation: "Amazon DynamoDB is AWS's managed NoSQL database service that provides fast and predictable performance with seamless scalability."
            },
            {
                question: "What is the AWS Well-Architected Framework pillar that focuses on the ability to recover from failures?",
                options: [
                    "Performance Efficiency",
                    "Cost Optimization",
                    "Reliability",
                    "Security"
                ],
                correct: 2,
                explanation: "The Reliability pillar focuses on the ability of a system to recover from infrastructure or service disruptions and dynamically acquire computing resources to meet demand."
            },
            {
                question: "Which AWS service is used for content delivery and caching?",
                options: [
                    "Amazon S3",
                    "Amazon CloudFront",
                    "Amazon Route 53",
                    "AWS Direct Connect"
                ],
                correct: 1,
                explanation: "Amazon CloudFront is a content delivery network (CDN) service that delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds."
            },
            {
                question: "What does the 'S' in Amazon S3 stand for?",
                options: [
                    "Secure",
                    "Simple",
                    "Scalable",
                    "Storage"
                ],
                correct: 1,
                explanation: "Amazon S3 stands for Simple Storage Service. It's an object storage service that offers industry-leading scalability, data availability, security, and performance."
            },
            {
                question: "Which AWS service provides virtual servers in the cloud?",
                options: [
                    "AWS Lambda",
                    "Amazon ECS",
                    "Amazon EC2",
                    "AWS Fargate"
                ],
                correct: 2,
                explanation: "Amazon EC2 (Elastic Compute Cloud) provides secure, resizable compute capacity in the cloud. It's designed to make web-scale cloud computing easier for developers."
            },
            {
                question: "What is the AWS pricing model that allows you to pay only for what you use?",
                options: [
                    "Reserved Instances",
                    "Spot Instances",
                    "Pay-as-you-go",
                    "Dedicated Hosts"
                ],
                correct: 2,
                explanation: "Pay-as-you-go pricing allows you to pay only for the individual services you need, for as long as you use them, without requiring long-term contracts or complex licensing."
            },
            {
                question: "Which AWS service is used for monitoring and observability?",
                options: [
                    "AWS CloudTrail",
                    "Amazon CloudWatch",
                    "AWS Config",
                    "AWS X-Ray"
                ],
                correct: 1,
                explanation: "Amazon CloudWatch is a monitoring and observability service that provides data and actionable insights to monitor applications, respond to system-wide performance changes, and optimize resource utilization."
            },
            {
                question: "What is the maximum size of an object that can be stored in Amazon S3?",
                options: [
                    "5 GB",
                    "5 TB",
                    "100 GB",
                    "1 TB"
                ],
                correct: 1,
                explanation: "The maximum size of an object that can be stored in Amazon S3 is 5 TB (terabytes). For objects larger than 100 MB, multipart upload is recommended."
            },
            {
                question: "Which AWS service provides a managed relational database?",
                options: [
                    "Amazon DynamoDB",
                    "Amazon RDS",
                    "Amazon Redshift",
                    "Amazon DocumentDB"
                ],
                correct: 1,
                explanation: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale a relational database in the cloud. It supports multiple database engines."
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
                explanation: "AWS IAM stands for Identity and Access Management. It enables you to manage access to AWS services and resources securely."
            },
            {
                question: "Which AWS service is used for serverless computing?",
                options: [
                    "Amazon EC2",
                    "AWS Lambda",
                    "Amazon ECS",
                    "AWS Batch"
                ],
                correct: 1,
                explanation: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. You pay only for the compute time you consume."
            },
            {
                question: "What is the AWS global infrastructure component that consists of one or more data centers?",
                options: [
                    "Region",
                    "Availability Zone",
                    "Edge Location",
                    "Local Zone"
                ],
                correct: 1,
                explanation: "An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region."
            },
            {
                question: "Which AWS service provides DNS services?",
                options: [
                    "Amazon CloudFront",
                    "AWS Direct Connect",
                    "Amazon Route 53",
                    "Amazon VPC"
                ],
                correct: 2,
                explanation: "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service designed to route end users to Internet applications."
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
                explanation: "The AWS shared responsibility model describes how AWS and the customer share responsibility for security and compliance. AWS secures the infrastructure, while customers secure their data and applications."
            },
            {
                question: "Which AWS service is used for data warehousing?",
                options: [
                    "Amazon RDS",
                    "Amazon DynamoDB",
                    "Amazon Redshift",
                    "Amazon Aurora"
                ],
                correct: 2,
                explanation: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. It's designed for large scale data set storage and analysis."
            }
        ];
    }

    initializeEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Leaderboard tabs
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
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        }
        
        localStorage.setItem('theme', newTheme);
    }

    startQuiz(mode) {
        this.mode = mode;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
        
        // Shuffle questions for variety
        this.shuffleQuestions();
        
        // Set time limit based on mode
        if (mode === 'exam') {
            this.timeRemaining = 90 * 60; // 90 minutes
        } else if (mode === 'trivia') {
            this.timeRemaining = 30 * 60; // 30 minutes
        } else {
            this.timeRemaining = null; // No time limit for practice
        }
        
        // Hide dashboard and show quiz
        document.getElementById('quiz-dashboard').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        
        // Start timer if needed
        if (this.timeRemaining) {
            this.startTimer();
        } else {
            document.getElementById('quiz-timer').style.display = 'none';
        }
        
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
            
            if (this.timeRemaining <= 0) {
                this.submitQuiz();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('time-remaining').textContent = timeString;
        
        // Add warning color when time is low
        const timerElement = document.getElementById('quiz-timer');
        if (this.timeRemaining < 300) { // Less than 5 minutes
            timerElement.classList.add('timer-warning');
        }
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        document.getElementById('question-num').textContent = this.currentQuestion + 1;
        document.getElementById('question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <input type="radio" id="option-${index}" name="answer" value="${index}">
                <label for="option-${index}">${option}</label>
            `;
            optionElement.addEventListener('click', () => this.selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        document.getElementById('prev-button').disabled = this.currentQuestion === 0;
        document.getElementById('next-button').disabled = true;
        
        if (this.currentQuestion === this.questions.length - 1) {
            document.getElementById('next-button').style.display = 'none';
            document.getElementById('submit-button').style.display = 'inline-block';
        } else {
            document.getElementById('next-button').style.display = 'inline-block';
            document.getElementById('submit-button').style.display = 'none';
        }
        
        // Hide explanation
        document.getElementById('explanation-card').classList.add('hidden');
        
        // Restore previous answer if exists
        if (this.answers[this.currentQuestion] !== undefined) {
            this.selectOption(this.answers[this.currentQuestion], false);
        }
    }

    selectOption(index, updateAnswer = true) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        const selectedOption = document.querySelectorAll('.option')[index];
        selectedOption.classList.add('selected');
        
        // Update radio button
        document.getElementById(`option-${index}`).checked = true;
        
        // Store answer
        if (updateAnswer) {
            this.answers[this.currentQuestion] = index;
        }
        
        // Enable next button
        document.getElementById('next-button').disabled = false;
        document.getElementById('submit-button').disabled = false;
        
        // Show explanation in practice mode
        if (this.mode === 'practice') {
            this.showExplanation();
        }
    }

    showExplanation() {
        const question = this.questions[this.currentQuestion];
        const explanationCard = document.getElementById('explanation-card');
        const explanationText = document.getElementById('explanation-text');
        
        const isCorrect = this.answers[this.currentQuestion] === question.correct;
        
        explanationText.innerHTML = `
            <div class="explanation-result ${isCorrect ? 'correct' : 'incorrect'}">
                <span class="result-icon">${isCorrect ? '✅' : '❌'}</span>
                <span class="result-text">${isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </div>
            <div class="explanation-content">
                <p><strong>Correct Answer:</strong> ${question.options[question.correct]}</p>
                <p>${question.explanation}</p>
            </div>
        `;
        
        explanationCard.classList.remove('hidden');
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
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        document.getElementById('total-questions-display').textContent = this.questions.length;
    }

    submitQuiz() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Calculate score
        let correctAnswers = 0;
        this.questions.forEach((question, index) => {
            if (this.answers[index] === question.correct) {
                correctAnswers++;
            }
        });
        
        this.score = Math.round((correctAnswers / this.questions.length) * 100);
        
        // Calculate time taken
        const timeTaken = Date.now() - this.startTime;
        const minutes = Math.floor(timeTaken / 60000);
        const seconds = Math.floor((timeTaken % 60000) / 1000);
        
        // Update high score
        this.updateHighScore();
        
        // Show results
        this.showResults(correctAnswers, this.questions.length - correctAnswers, `${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    showResults(correct, incorrect, timeTaken) {
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('results-container').classList.remove('hidden');
        
        // Update results display
        document.getElementById('final-score').textContent = `${this.score}%`;
        document.getElementById('correct-answers').textContent = correct;
        document.getElementById('incorrect-answers').textContent = incorrect;
        document.getElementById('time-taken').textContent = timeTaken;
        
        // Update badge based on score
        const badge = document.getElementById('results-badge');
        const badgeIcon = badge.querySelector('.badge-icon');
        const badgeText = badge.querySelector('.badge-text');
        
        if (this.score >= 90) {
            badgeIcon.textContent = '🏆';
            badgeText.textContent = 'Excellent!';
            badge.className = 'results-badge excellent';
        } else if (this.score >= 70) {
            badgeIcon.textContent = '🎉';
            badgeText.textContent = 'Well Done!';
            badge.className = 'results-badge good';
        } else {
            badgeIcon.textContent = '📚';
            badgeText.textContent = 'Keep Learning!';
            badge.className = 'results-badge needs-improvement';
        }
    }

    restartQuiz() {
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('quiz-dashboard').classList.remove('hidden');
    }

    reviewAnswers() {
        // Implementation for reviewing answers
        alert('Review functionality coming soon!');
    }

    shareResults() {
        const text = `I just scored ${this.score}% on the AWS Cloud Practitioner practice test! 🚀 #AWS #CloudPractitioner`;
        
        if (navigator.share) {
            navigator.share({
                title: 'AWS Practice Test Results',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    }

    updateHighScore() {
        const currentHighScore = localStorage.getItem(`aws-quiz-high-score-${this.mode}`) || 0;
        if (this.score > currentHighScore) {
            localStorage.setItem(`aws-quiz-high-score-${this.mode}`, this.score);
            this.loadHighScore();
        }
    }

    loadHighScore() {
        const highScore = localStorage.getItem('aws-quiz-high-score-practice') || 0;
        document.getElementById('high-score').textContent = `${highScore}%`;
    }

    switchLeaderboardTab(tab) {
        // Implementation for switching leaderboard tabs
        console.log(`Switching to ${tab} leaderboard`);
    }
}

// Global functions for HTML onclick handlers
function startQuiz(mode) {
    window.awsQuiz.startQuiz(mode);
}

function nextQuestion() {
    window.awsQuiz.nextQuestion();
}

function previousQuestion() {
    window.awsQuiz.previousQuestion();
}

function submitQuiz() {
    window.awsQuiz.submitQuiz();
}

function restartQuiz() {
    window.awsQuiz.restartQuiz();
}

function reviewAnswers() {
    window.awsQuiz.reviewAnswers();
}

function shareResults() {
    window.awsQuiz.shareResults();
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.awsQuiz = new AWSQuiz();
});