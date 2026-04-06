# 🔐 Least Privilege Security Checklist

## 🪣 Storage (S3 / Buckets)

-   [ ] No bucket has public write access (CRITICAL)
-   [ ] Public read access is explicitly justified and documented
-   [ ] Bucket policies do not use wildcards (\*) unnecessarily
-   [ ] Objects are served via pre-signed URLs instead of public access
-   [ ] Versioning is enabled for critical buckets
-   [ ] Object integrity checks (hash/signature) are in place for
    SDKs/assets
-   [ ] Block Public Access setting is enabled at account + bucket level
-   [ ] Access logs are enabled and monitored

## 👤 IAM (Users, Roles, Policies)

-   [ ] No IAM policy grants *:* unless absolutely required
-   [ ] Permissions are scoped to specific resources and actions
-   [ ] Roles are used instead of long-lived access keys
-   [ ] Temporary credentials (STS) are used wherever possible
-   [ ] No unused or stale credentials
-   [ ] MFA is enabled for all privileged accounts
-   [ ] Service roles have only required permissions

## 🔑 Secrets & Credentials

-   [ ] No secrets stored in code repositories or frontend apps
-   [ ] Secrets managed via secure services
-   [ ] Secrets are rotated periodically
-   [ ] Access to secrets is role-based and minimal

## 🌐 API & Backend Access

-   [ ] APIs enforce authentication & authorization
-   [ ] Rate limiting and throttling are enabled
-   [ ] Internal services are not publicly exposed
-   [ ] Sensitive endpoints require stricter scopes/roles

## 📦 CI/CD Pipelines

-   [ ] Pipeline roles follow least privilege
-   [ ] Build artifacts stored in secure locations
-   [ ] Deployment permissions restricted
-   [ ] Integrity checks for build artifacts
-   [ ] No secrets exposed in logs

## 🔍 Monitoring & Auditing

-   [ ] Logging enabled for access events and permission changes
-   [ ] Alerts for public access and policy changes
-   [ ] Regular audits for over-permissive roles and unused resources
-   [ ] Automated policy scanners in place

## 🧪 Development Practices

-   [ ] No temporary broad permissions in production
-   [ ] Security reviews in PR process
-   [ ] Infrastructure-as-Code used and version controlled
-   [ ] No production credentials used locally

## 🚨 High-Risk Red Flags

-   [ ] Public write access anywhere
-   [ ] \* resource + \* action policies
-   [ ] Hardcoded credentials
-   [ ] Unmonitored critical resources
-   [ ] No logging on sensitive systems
