"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import styles from "./login.module.css";

const initialState: LoginState = {
  error: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialState
  );

  return (
    <main className={styles.page}>
      <form action={formAction} className={styles.form}>
        <p className={styles.label}>GUZO ADMINISTRATION</p>

        <h1>Welcome back</h1>
        <p className={styles.description}>
          Sign in to manage destinations, tours, and bookings.
        </p>

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {state.error && (
          <p className={styles.error} role="alert">
            {state.error}
          </p>
        )}

        <button type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </button>

        <p className={styles.footer}>
          Guzo — Discover Ethiopia. Live the Journey.
        </p>
      </form>
    </main>
  );
}
