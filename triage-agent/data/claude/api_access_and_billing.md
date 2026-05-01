# Claude API Access and Billing

## Getting API Access

- Claude API access requires an Anthropic account and an API key.
- Create an account at console.anthropic.com.
- API keys are generated from the console under "API Keys".
- Protect your API key — never share it publicly or commit it to version control.
- For enterprise access or custom rate limits, contact Anthropic sales at sales@anthropic.com.

## Rate Limits

- Rate limits depend on your usage tier (Free, Build, Scale).
- Limits are measured in requests per minute (RPM) and tokens per minute (TPM).
- If you receive a 429 error, you have exceeded your rate limit. Implement exponential backoff.
- Upgrading your tier increases rate limits. See console.anthropic.com/settings/limits for your current tier.
- Even after upgrading to Pro or higher, temporary rate limits may apply during peak usage.

## API Billing

- API usage is billed per token (input tokens + output tokens).
- Pricing varies by model: Claude 3 Haiku is cheapest; Claude 3.5 Sonnet and Claude 3 Opus are higher.
- View current usage and invoices at console.anthropic.com/billing.
- Billing is monthly. Charges appear within 24-48 hours of incurring usage.
- For billing disputes or unexpected charges, contact support@anthropic.com with your account email and the specific charge amount and date.

## API Error Codes

- 400 Bad Request: Invalid request format or parameters.
- 401 Unauthorized: Invalid or missing API key.
- 403 Forbidden: Your account does not have permission for this action.
- 429 Too Many Requests: Rate limit exceeded. Retry with backoff.
- 500 Internal Server Error: Anthropic server issue. Retry after a short delay.
- 529 Overloaded: High traffic. Retry with exponential backoff.
