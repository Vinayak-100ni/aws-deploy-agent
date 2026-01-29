1. Create an Lunch Template and use User Data
```bash
#!/bin/bash
# Update packages
sudo apt update -y

# Install curl and wget (needed for NodeSource & CodeDeploy)
sudo apt install -y curl wget ruby

# Install Node.js (Node + npm) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify node & npm
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2

# Install and start CodeDeploy agent
cd /tmp
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo systemctl start codedeploy-agent
sudo systemctl enable codedeploy-agent
```

Step 2: Create an IAM Role for EC2 Instances
```bash
1️⃣ Go to IAM Console → Roles → Create Role
2️⃣ Select AWS Service → EC2 → Attach AWSCodeDeployFullAccess + AmazonS3ReadOnlyAccess
3️⃣ Attach this IAM Role to your EC2 instances in the ASG
```


Step 3: Create an IAM Role for AWS CodeDeploy
```bash
1️⃣ Go to IAM Console → Roles → Create Role
2️⃣ Select AWS Service → CodeDeploy → Attach AWSCodeDeployRole
3️⃣ Attach this role while setting up CodeDeploy
```

Step 4: Create Auto Scaling Group
```bash
Use the Launch Template
Desired capacity: ≥ 1
Subnets: private or public (both fine)
Health checks: EC2 (or ELB if used)
🚀 Now every new instance automatically installs CodeDeploy agent
```

Step 5: Create a CodeDeploy Application
```bash
1️⃣ Go to AWS CodeDeploy Console → Create Application
2️⃣ Choose Compute Platform → EC2/On-Premises
```

Step 6: Create a Deployment Group
```bash
1️⃣ In CodeDeploy Application, click Create Deployment Group
2️⃣ Select Auto Scaling Group to ensure instances get updated
3️⃣ Choose Service Role (IAM role created for CodeDeploy)
4️⃣ Set Deployment Type to In-Place
5️⃣ Enable Load Balancer (if needed, so ALB removes instances during deployment)
```

