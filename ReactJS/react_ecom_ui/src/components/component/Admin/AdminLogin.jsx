import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { dispatch } = useContext(GlobalContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      dispatch({type:"LOGIN"})
      navigate("/adminDashboard");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
