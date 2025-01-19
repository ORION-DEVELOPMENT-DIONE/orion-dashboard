import React from 'react';

interface CodeBlockProps {
  children: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="bg-purple-950/50 p-4 rounded-lg border border-purple-500/20 overflow-x-auto">
      <code className="text-purple-100 text-sm whitespace-pre">
        {children.trim()}
      </code>
    </pre>
  );
}