import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-xl border border-border/50">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 rotate-3 hover:rotate-0 transition-transform">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground text-center tracking-tight">
              CSM Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Sign in to manage satisfaction surveys and view analytics
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-1.5 text-sm font-semibold text-foreground/80"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground/70"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-semibold text-foreground/80"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground/70"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 pb-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/30 transition-colors"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-primary-foreground font-medium bg-primary hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-border/50 pt-6">
             <button 
                onClick={() => navigate('/')}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
               ← Back to Survey Form
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
