"use client";

import { useState, useMemo, useCallback } from "react";
import {
    Calculator,
    Building2,
    Brain,
    ShieldAlert,
    Database,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Info,
} from "lucide-react";

interface CalculatorInputs {
    companySize: number;
    aiUsageIntensity: number;
    industryVertical: string;
    dataSensitivity: string;
}

interface CalculatorResult {
    riskScore: number;
    riskLevel: "Low" | "Medium" | "High" | "Critical";
    annualCost: number;
    recommendations: string[];
}

const INDUSTRY_WEIGHTS: Record<string, number> = {
    healthcare: 1.5,
    finance: 1.4,
    legal: 1.3,
    government: 1.35,
    education: 1.1,
    retail: 1.0,
    technology: 1.2,
    manufacturing: 1.05,
};

const SENSITIVITY_WEIGHTS: Record<string, number> = {
    public: 0.5,
    internal: 1.0,
    confidential: 1.5,
    restricted: 2.0,
};

const INDUSTRY_OPTIONS = [
    { value: "healthcare", label: "Healthcare & Medical" },
    { value: "finance", label: "Financial Services" },
    { value: "legal", label: "Legal & Law" },
    { value: "government", label: "Government & Public" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail & E-Commerce" },
    { value: "technology", label: "Technology & SaaS" },
    { value: "manufacturing", label: "Manufacturing" },
];

const SENSITIVITY_OPTIONS = [
    { value: "public", label: "Public Data", desc: "Non-sensitive, open data" },
    { value: "internal", label: "Internal Data", desc: "Business-sensitive" },
    {
        value: "confidential",
        label: "Confidential",
        desc: "PII, financial records",
    },
    { value: "restricted", label: "Restricted", desc: "Health, biometric data" },
];

function calculateResults(inputs: CalculatorInputs): CalculatorResult {
    const sizeScore = Math.min(inputs.companySize / 100, 10);
    const usageScore = inputs.aiUsageIntensity;
    const industryWeight = INDUSTRY_WEIGHTS[inputs.industryVertical] ?? 1.0;
    const sensitivityWeight = SENSITIVITY_WEIGHTS[inputs.dataSensitivity] ?? 1.0;

    const rawRisk =
        (sizeScore * 0.2 + usageScore * 0.35) * industryWeight * sensitivityWeight;
    const riskScore = Math.min(Math.round(rawRisk * 10), 100);

    let riskLevel: CalculatorResult["riskLevel"];
    if (riskScore <= 25) riskLevel = "Low";
    else if (riskScore <= 50) riskLevel = "Medium";
    else if (riskScore <= 75) riskLevel = "High";
    else riskLevel = "Critical";

    // Cost calculation (base: $5,000, scaled by risk profile)
    const baseCost = 5000;
    const sizeFactor = Math.log2(Math.max(inputs.companySize, 1) + 1) * 1000;
    const annualCost = Math.round(
        (baseCost + sizeFactor * usageScore * sensitivityWeight * industryWeight) /
        100
    ) * 100;

    const recommendations: string[] = [];
    if (riskScore > 50)
        recommendations.push("Conduct a comprehensive AI audit immediately");
    if (inputs.dataSensitivity === "restricted" || inputs.dataSensitivity === "confidential")
        recommendations.push("Implement data anonymization pipelines");
    if (inputs.aiUsageIntensity > 6)
        recommendations.push("Establish an AI ethics review board");
    if (INDUSTRY_WEIGHTS[inputs.industryVertical]! > 1.2)
        recommendations.push("Engage regulatory counsel for industry-specific compliance");
    recommendations.push("Deploy continuous AI monitoring and alerting");
    if (riskScore > 30)
        recommendations.push("Create an AI incident response plan");

    return { riskScore, riskLevel, annualCost, recommendations };
}

const RISK_COLORS = {
    Low: { bar: "bg-success", text: "text-success", bg: "bg-success/10" },
    Medium: { bar: "bg-warning", text: "text-warning", bg: "bg-warning/10" },
    High: { bar: "bg-orange-500", text: "text-orange-500", bg: "bg-orange-500/10" },
    Critical: { bar: "bg-danger", text: "text-danger", bg: "bg-danger/10" },
};

export default function RiskCostCalculator() {
    const [inputs, setInputs] = useState<CalculatorInputs>({
        companySize: 50,
        aiUsageIntensity: 5,
        industryVertical: "technology",
        dataSensitivity: "internal",
    });

    const [hasCalculated, setHasCalculated] = useState(false);

    const results = useMemo(() => calculateResults(inputs), [inputs]);

    const handleCalculate = useCallback(() => {
        setHasCalculated(true);
    }, []);

    const colors = RISK_COLORS[results.riskLevel];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
                {/* ─── Input Panel ─── */}
                <div className="glass rounded-2xl p-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
                            <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Organization Profile</h3>
                            <p className="text-xs text-muted">Configure your parameters</p>
                        </div>
                    </div>

                    {/* Company Size */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-3">
                            <Building2 className="h-4 w-4 text-primary-light" />
                            Company Size
                            <span className="ml-auto text-primary-light font-bold">
                                {inputs.companySize.toLocaleString()} employees
                            </span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={1000}
                            value={inputs.companySize}
                            onChange={(e) =>
                                setInputs((prev) => ({
                                    ...prev,
                                    companySize: Number(e.target.value),
                                }))
                            }
                            className="w-full h-2 rounded-full appearance-none bg-card-border cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted mt-1">
                            <span>1</span>
                            <span>1,000+</span>
                        </div>
                    </div>

                    {/* AI Usage Intensity */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-3">
                            <Brain className="h-4 w-4 text-primary-light" />
                            AI Usage Intensity
                            <span className="ml-auto text-primary-light font-bold">
                                {inputs.aiUsageIntensity}/10
                            </span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={inputs.aiUsageIntensity}
                            onChange={(e) =>
                                setInputs((prev) => ({
                                    ...prev,
                                    aiUsageIntensity: Number(e.target.value),
                                }))
                            }
                            className="w-full h-2 rounded-full appearance-none bg-card-border cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted mt-1">
                            <span>Minimal</span>
                            <span>Mission-Critical</span>
                        </div>
                    </div>

                    {/* Industry Vertical */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-3">
                            <ShieldAlert className="h-4 w-4 text-primary-light" />
                            Industry Vertical
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {INDUSTRY_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            industryVertical: opt.value,
                                        }))
                                    }
                                    className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${inputs.industryVertical === opt.value
                                            ? "gradient-bg text-white shadow-lg shadow-primary/20"
                                            : "glass glass-hover text-muted-light"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Data Sensitivity */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-3">
                            <Database className="h-4 w-4 text-primary-light" />
                            Data Sensitivity Level
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {SENSITIVITY_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() =>
                                        setInputs((prev) => ({
                                            ...prev,
                                            dataSensitivity: opt.value,
                                        }))
                                    }
                                    className={`px-3 py-2.5 rounded-lg text-left transition-all ${inputs.dataSensitivity === opt.value
                                            ? "gradient-bg text-white shadow-lg shadow-primary/20"
                                            : "glass glass-hover"
                                        }`}
                                >
                                    <div className="text-xs font-medium">{opt.label}</div>
                                    <div
                                        className={`text-[10px] mt-0.5 ${inputs.dataSensitivity === opt.value
                                                ? "text-white/70"
                                                : "text-muted"
                                            }`}
                                    >
                                        {opt.desc}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="w-full py-3.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                    >
                        Calculate Risk &amp; Cost
                    </button>
                </div>

                {/* ─── Results Panel ─── */}
                <div className="glass rounded-2xl p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Assessment Results</h3>
                            <p className="text-xs text-muted">Your compliance profile</p>
                        </div>
                    </div>

                    {!hasCalculated ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Info className="h-12 w-12 text-muted mx-auto mb-4" />
                                <p className="text-sm text-muted">
                                    Configure your organization profile and click &ldquo;Calculate&rdquo;
                                    to see results.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            {/* Risk Score */}
                            <div className="glass rounded-xl p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-muted">Risk Score</span>
                                    <span className={`text-sm font-bold ${colors.text}`}>
                                        {results.riskLevel}
                                    </span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-extrabold">
                                        {results.riskScore}
                                    </span>
                                    <span className="text-muted mb-1">/100</span>
                                </div>
                                <div className="mt-3 h-2 rounded-full bg-card-border overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${colors.bar} transition-all duration-1000 ease-out`}
                                        style={{ width: `${results.riskScore}%` }}
                                    />
                                </div>
                            </div>

                            {/* Annual Cost */}
                            <div className="glass rounded-xl p-6">
                                <span className="text-sm text-muted">
                                    Estimated Annual Compliance Cost
                                </span>
                                <div className="flex items-end gap-1 mt-2">
                                    <span className="text-4xl font-extrabold gradient-text">
                                        ${results.annualCost.toLocaleString()}
                                    </span>
                                    <span className="text-muted mb-1">/year</span>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                    Recommendations
                                </h4>
                                <ul className="space-y-2">
                                    {results.recommendations.map((rec, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-xs text-muted-light"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5 text-primary-light mt-0.5 shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
