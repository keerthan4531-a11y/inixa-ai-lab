import React from 'react';

export interface TextTypeProps {
  text: string | string[];
  as?: React.ElementType;
  prefix?: string;
  prefixColor?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  deleteMode?: 'backspace' | 'select';
  typeEffect?: 'none' | 'fade' | 'blur' | 'rise';
  mistakes?: number;
  variableSpeed?: { min: number; max: number };
  loop?: boolean;
  showCursor?: boolean;
  cursorStyle?: 'character' | 'bar' | 'block' | 'underscore';
  cursorCharacter?: string | React.ReactNode;
  cursorColor?: string;
  cursorBlinkDuration?: number;
  cursorGlide?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorClassName?: string;
  className?: string;
  textColors?: string[];
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  style?: React.CSSProperties;
}

declare const TextType: React.FC<TextTypeProps>;
export default TextType;

