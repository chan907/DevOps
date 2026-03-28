import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { loginReq, signupReq } from "./fetchApi";

/* ─── 1. INFORMATION ORGANIZATION ───────────────────────────────────────────
   Separate state per form, clear field grouping, logical top-down flow        */
const loginInit  = { email: "", password: "", showPass: false, loading: false, error: "" };
const signupInit = { name: "", email: "", password: "", cPassword: "", showPass: false, showCPass: false, loading: false, error: "", success: "" };

const loginReducer  = (s, a) => ({ ...s, ...a });
const signupReducer = (s, a) => ({ ...s, ...a });

/* ─── 2. UI ELEMENTS ─────────────────────────────────────────────────────────
   Reusable field, password toggle, strength bar, alert components             */

const Field = ({ label, id, type, value, onChange, placeholder, error, children }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label} <span className="text-red-400">*</span>
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={id}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
          error ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-gray-300 focus:border-gray-400"
        }`}
      />
      {children}
    </div>
    {/* ─── 3. USABILITY ISSUES: inline field-level errors ─── */}
    {error && <p className="text-xs text-red-500 flex items-center space-x-1"><span>⚠</span><span>{error}</span></p>}
  </div>
);

const EyeIcon = ({ visible, onClick }) => (
  <button type="button" onClick={onClick} tabIndex={-1}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
    aria-label={visible ? "Hide password" : "Show password"}>
    {visible
      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
      : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    }
  </button>
);

/* ─── 4. UX IMPROVEMENTS: password strength indicator ───────────────────── */
const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const levels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
  const textColors = ["", "text-red-500", "text-yellow-500", "text-blue-500", "text-green-600"];
  return (
    <div className="space-y-1 mt-1">
      <div className="flex space-x-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= score ? colors[score] : "bg-gray-200"}`} />
        ))}
      </div>
      {score > 0 && <p className={`text-xs font-medium ${textColors[score]}`}>{levels[score]} password</p>}
    </div>
  );
};

const Alert = ({ type, msg }) => {
  if (!msg) return null;
  const styles = {
    error:   "bg-red-50 border-red-300 text-red-700",
    success: "bg-green-50 border-green-300 text-green-700",
    info:    "bg-blue-50 border-blue-300 text-blue-700",
  };
  const icons = { error: "✕", success: "✓", info: "ℹ" };
  return (
    <div className={`border rounded-lg px-4 py-3 text-sm flex items-start space-x-2 ${styles[type]}`}>
      <span className="font-bold mt-0.5">{icons[type]}</span>
      <span>{msg}</span>
    </div>
  );
};

const Spinner = () => (
  <svg className="animate-spin w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
  </svg>
);

/* ─── 5. UX/UI PRINCIPLES: Fitts's Law — large tap targets, clear hierarchy ─ */
const SubmitBtn = ({ loading, label }) => (
  <button type="submit" disabled={loading}
    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
    {loading && <Spinner />}{label}
  </button>
);

/* ─── 6. OVERCOMING USABILITY CHALLENGES ────────────────────────────────────
   - Keyboard: Enter submits form
   - Tab order: logical top-to-bottom
   - ARIA labels on icon buttons
   - Loading state prevents double submit                                       */

const LoginForm = ({ onSwitch }) => {
  const history = useHistory();
  const [s, dispatch] = useReducer(loginReducer, loginInit);

  const validate = () => {
    if (!s.email)    return "Email is required";
    if (!/\S+@\S+\.\S+/.test(s.email)) return "Enter a valid email address";
    if (!s.password) return "Password is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return dispatch({ error: err });
    dispatch({ loading: true, error: "" });
    try {
      const res = await loginReq({ email: s.email, password: s.password });
      if (res.error) {
        dispatch({ loading: false, error: res.error, password: "" });
      } else if (res.token) {
        localStorage.setItem("jwt", JSON.stringify(res));
        history.push("/");
      }
    } catch {
      dispatch({ loading: false, error: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue shopping</p>
      </div>

      <Alert type="error" msg={s.error} />

      <Field label="Email Address" id="email" type="email" value={s.email}
        onChange={e => dispatch({ email: e.target.value, error: "" })}
        placeholder="you@example.com" error={s.error && !s.email ? s.error : ""} />

      <Field label="Password" id="current-password" type={s.showPass ? "text" : "password"}
        value={s.password}
        onChange={e => dispatch({ password: e.target.value, error: "" })}
        placeholder="Enter your password"
        error={s.error && !s.password ? s.error : ""}>
        <EyeIcon visible={s.showPass} onClick={() => dispatch({ showPass: !s.showPass })} />
      </Field>

      <SubmitBtn loading={s.loading} label="Sign In" />

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch}
          className="text-gray-900 font-semibold hover:underline focus:outline-none">
          Create one free
        </button>
      </p>
    </form>
  );
};

const SignupForm = ({ onSwitch }) => {
  const [s, dispatch] = useReducer(signupReducer, signupInit);

  const validate = () => {
    if (!s.name)      return "Full name is required";
    if (s.name.length < 3) return "Name must be at least 3 characters";
    if (!s.email)     return "Email is required";
    if (!/\S+@\S+\.\S+/.test(s.email)) return "Enter a valid email address";
    if (!s.password)  return "Password is required";
    if (s.password.length < 8) return "Password must be at least 8 characters";
    if (s.password !== s.cPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return dispatch({ error: err, success: "" });
    dispatch({ loading: true, error: "", success: "" });
    try {
      const res = await signupReq({ name: s.name, email: s.email, password: s.password, cPassword: s.cPassword });
      if (res.error) {
        const msg = typeof res.error === "object" ? Object.values(res.error).find(v => v) : res.error;
        dispatch({ loading: false, error: msg, success: "" });
      } else if (res.success) {
        dispatch({ loading: false, success: res.success, error: "", name: "", email: "", password: "", cPassword: "" });
        setTimeout(onSwitch, 2000);
      }
    } catch {
      dispatch({ loading: false, error: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
        <p className="text-sm text-gray-500 mt-1">Join BF-Fabric and start shopping today</p>
      </div>

      <Alert type="error"   msg={s.error} />
      <Alert type="success" msg={s.success ? `${s.success} Redirecting to sign in...` : ""} />

      <Field label="Full Name" id="name" type="text" value={s.name}
        onChange={e => dispatch({ name: e.target.value, error: "", success: "" })}
        placeholder="John Doe" />

      <Field label="Email Address" id="signup-email" type="email" value={s.email}
        onChange={e => dispatch({ email: e.target.value, error: "", success: "" })}
        placeholder="you@example.com" />

      <div className="space-y-1">
        <Field label="Password" id="new-password" type={s.showPass ? "text" : "password"}
          value={s.password}
          onChange={e => dispatch({ password: e.target.value, error: "", success: "" })}
          placeholder="Min. 8 characters">
          <EyeIcon visible={s.showPass} onClick={() => dispatch({ showPass: !s.showPass })} />
        </Field>
        {/* ─── 7. PASSWORD STRENGTH: real-time feedback ─── */}
        <PasswordStrength password={s.password} />
      </div>

      <Field label="Confirm Password" id="confirm-password" type={s.showCPass ? "text" : "password"}
        value={s.cPassword}
        onChange={e => dispatch({ cPassword: e.target.value, error: "", success: "" })}
        placeholder="Re-enter your password"
        error={s.cPassword && s.password !== s.cPassword ? "Passwords do not match" : ""}>
        <EyeIcon visible={s.showCPass} onClick={() => dispatch({ showCPass: !s.showCPass })} />
      </Field>

      <SubmitBtn loading={s.loading} label="Create Account" />

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}
          className="text-gray-900 font-semibold hover:underline focus:outline-none">
          Sign in
        </button>
      </p>
    </form>
  );
};

/* ─── MAIN AUTH PAGE ─────────────────────────────────────────────────────── */
const AuthPage = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-widest uppercase">BF-Fabric</h1>
          <p className="text-gray-500 text-sm mt-2">Premium Fabric &amp; Clothing Store</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Tab Bar */}
          <div className="flex border-b border-gray-100">
            {["login", "signup"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`w-1/2 py-4 text-sm font-semibold tracking-wide transition-all focus:outline-none ${
                  tab === t
                    ? "text-gray-900 border-b-2 border-gray-900 bg-white"
                    : "text-gray-400 hover:text-gray-600 bg-gray-50"
                }`}>
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="px-8 py-8">
            {tab === "login"
              ? <LoginForm  onSwitch={() => setTab("signup")} />
              : <SignupForm onSwitch={() => setTab("login")}  />
            }
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default AuthPage;
