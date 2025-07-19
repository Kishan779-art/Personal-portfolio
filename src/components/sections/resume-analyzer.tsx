'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, FileText, Bot, Sparkles } from 'lucide-react';
import { analyzeResume, AnalyzeResumeOutput } from '@/ai/flows/resume-analysis';
import { useToast } from '@/hooks/use-toast';
import { useTypewriter } from '@/hooks/use-typewriter';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResumeOutput | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayText = useTypewriter(result?.suggestions || '', 20);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please upload your resume first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const resumeDataUri = reader.result as string;
        const analysisResult = await analyzeResume({ resumeDataUri });
        setResult(analysisResult);
      } catch (error) {
        console.error("Analysis failed:", error);
        toast({ title: "Analysis Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = (error) => {
      console.error("File reading error:", error);
      toast({ title: "File Error", description: "Could not read the resume file.", variant: "destructive" });
      setLoading(false);
    };
  };

  return (
    <section id="resume-ai" className="space-y-16">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">AI Resume Analysis</h2>
        <p className="mt-4 text-lg text-muted-foreground">Get instant feedback on your resume from my AI assistant.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-accent font-headline flex items-center gap-2"><UploadCloud /> Upload Your Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Label htmlFor="resume-upload" className="p-10 border-2 border-dashed rounded-lg cursor-pointer text-center transition-colors block border-primary/30 hover:border-accent hover:bg-accent/10">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>Click to select a file</p>
                <p className="text-xs text-muted-foreground mt-2">PDF, DOCX, TXT accepted</p>
            </Label>
            <Input id="resume-upload" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.txt" />
            
            {file && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>Remove</Button>
              </div>
            )}
            <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 animate-glow-pulse">
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-accent font-headline flex items-center gap-2"><Sparkles /> AI Feedback</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[200px] text-muted-foreground">
            {loading && <p>Thinking...</p>}
            {result && (
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div className="p-4 bg-muted rounded-lg w-full">
                    <p className="whitespace-pre-wrap">{displayText}</p>
                  </div>
                </div>
              </div>
            )}
            {!loading && !result && <p>Upload a resume to get started.</p>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
