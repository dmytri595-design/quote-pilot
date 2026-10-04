/*
 * QuotePilot integration contracts — v0.5.0
 * No secrets belong in this front-end repository.
 * Each adapter is intentionally replaceable by a secure backend endpoint.
 */
window.QuotePilotAdapters = {
  ai: {
    mode: "mock",
    async extractQuote(input, context) {
      return { mode: "mock", input, context, message: "Replace this adapter with your server-side AI endpoint." };
    },
    async refineQuote(quote, instruction) {
      return { ...quote, _adapter: "mock", _instruction: instruction };
    }
  },
  email: {
    mode: "mock",
    async sendQuote(payload) {
      return { ok: true, mode: "mock", message: "No email was sent. Connect a server-side mail provider here.", payload };
    }
  },
  payments: {
    mode: "mock",
    async createPaymentLink(payload) {
      return { ok: true, mode: "mock", url: "#payment-demo", message: "No payment link was created." , payload };
    }
  },
  storage: {
    mode: "localStorage",
    async save(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      return { ok: true, mode: "localStorage" };
    },
    async load(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
      catch { return fallback; }
    }
  }
};
