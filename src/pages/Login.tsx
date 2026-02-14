
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useData();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await login(password);
            if (result.success) {
                navigate("/admin");
            } else {
                setError(`${result.message}${result.code ? ` (${result.code})` : ""}`);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 noise-bg">
            <Card className="w-full max-w-md glass border-white/10">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold">Admin Access</CardTitle>
                    <CardDescription>Enter password to manage portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black/20 border-white/10"
                            />
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#ff8c00] to-[#ffa500] border-none text-black font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
