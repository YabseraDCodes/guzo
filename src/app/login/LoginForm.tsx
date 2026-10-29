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
      <section className={styles.story} aria-label="Discover Africa with GUZO">
        <div className={styles.storyContent}>
          <p className={styles.eyebrow}><span /> YOUR JOURNEY BEGINS HERE</p>
          <h1>
            Every journey
            <br />
            starts with <em>wonder.</em>
          </h1>
          <p className={styles.storyCopy}>
            Sign in to care for the details behind every unforgettable GUZO
            experience.
          </p>
        </div>
      </section>

      <section className={styles.formPanel}>
        <form action={formAction} className={styles.form}>
          <p className={styles.formEyebrow}>GUZO ADMINISTRATION</p>
          <h2>Welcome back</h2>
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
            {!isPending && <span aria-hidden="true">↗</span>}
          </button>

          <p className={styles.footer}>
            GUZO — Discover Africa. Live the Journey.
          </p>
        </form>
      </section>
    </main>
  );
}
