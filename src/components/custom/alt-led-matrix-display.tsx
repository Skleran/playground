"use client";
import React, { useRef, useEffect } from "react";

interface LedTickerProps {
  text: string;
  width?: number;
  height?: number;
  dotSize?: number;
  dotSpacing?: number;
  step?: number;
  fps?: number;
  color?: string;
  glow?: boolean;
  offColor?: string;
  charSpacing?: number; // spacing between characters
}

const LedTickerCustomFont: React.FC<LedTickerProps> = ({
  text,
  width = 600,
  height = 40,
  dotSize = 3,
  dotSpacing = 1,
  step = 2,
  fps = 10,
  color = "#0f0",
  glow = false,
  offColor = "#222",
  charSpacing = 1, // default 1 column spacing between characters
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charWidth = 5;
  const charHeight = 7;
  // Custom font definition - each character is a 5x7 matrix
  const charToLED = (theChar?: string): boolean[][] => {
    switch (theChar?.toUpperCase()) {
      case "A":
        return [
          [false, false, true, true, true, true, true],
          [false, true, false, false, true, false, false],
          [true, false, false, false, true, false, false],
          [false, true, false, false, true, false, false],
          [false, false, true, true, true, true, true],
        ];
      case "B":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, true, false, true, true, false],
        ];
      case "C":
        return [
          [false, true, true, true, true, true, false],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [false, true, false, false, false, true, false],
        ];
      case "D":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [false, true, true, true, true, true, false],
        ];
      case "E":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, false, false, false, true],
        ];
      case "F":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [true, false, false, false, false, false, false],
        ];
      case "G":
        return [
          [false, true, true, true, true, true, false],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [true, false, false, false, true, false, true],
          [true, true, false, false, true, true, true],
        ];
      case "H":
        return [
          [true, true, true, true, true, true, true],
          [false, false, false, true, false, false, false],
          [false, false, false, true, false, false, false],
          [false, false, false, true, false, false, false],
          [true, true, true, true, true, true, true],
        ];
      case "I":
        return [
          [false, false, false, false, false, false, false],
          [true, false, false, false, false, false, true],
          [true, true, true, true, true, true, true],
          [true, false, false, false, false, false, true],
          [false, false, false, false, false, false, false],
        ];
      case "J":
        return [
          [false, false, false, false, false, true, false],
          [false, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [true, true, true, true, true, true, false],
          [true, false, false, false, false, false, false],
        ];
      case "K":
        return [
          [true, true, true, true, true, true, true],
          [false, false, false, true, false, false, false],
          [false, false, true, false, true, false, false],
          [false, true, false, false, false, true, false],
          [true, false, false, false, false, false, true],
        ];
      case "L":
        return [
          [true, true, true, true, true, true, true],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, true],
        ];
      case "M":
        return [
          [true, true, true, true, true, true, true],
          [false, true, false, false, false, false, false],
          [false, false, true, false, false, false, false],
          [false, true, false, false, false, false, false],
          [true, true, true, true, true, true, true],
        ];
      case "N":
        return [
          [true, true, true, true, true, true, true],
          [false, false, true, false, false, false, false],
          [false, false, false, true, false, false, false],
          [false, false, false, false, true, false, false],
          [true, true, true, true, true, true, true],
        ];
      case "O":
        return [
          [false, true, true, true, true, true, false],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [true, false, false, false, false, false, true],
          [false, true, true, true, true, true, false],
        ];
      case "P":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [false, true, true, false, false, false, false],
        ];
      case "Q":
        return [
          [false, true, true, true, true, true, false],
          [true, false, false, false, false, false, true],
          [true, false, false, false, true, false, true],
          [true, false, false, false, false, true, false],
          [false, true, true, true, true, false, true],
        ];
      case "R":
        return [
          [true, true, true, true, true, true, true],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [true, false, false, true, false, false, false],
          [false, true, true, false, true, true, true],
        ];
      case "S":
        return [
          [false, true, true, false, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, false, true, true, false],
        ];
      case "T":
        return [
          [true, false, false, false, false, false, false],
          [true, false, false, false, false, false, false],
          [true, true, true, true, true, true, true],
          [true, false, false, false, false, false, false],
          [true, false, false, false, false, false, false],
        ];
      case "U":
        return [
          [true, true, true, true, true, true, false],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, true],
          [true, true, true, true, true, true, false],
        ];
      case "V":
        return [
          [true, true, true, true, true, false, false],
          [false, false, false, false, false, true, false],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, true, false],
          [true, true, true, true, true, false, false],
        ];
      case "W":
        return [
          [true, true, true, true, true, true, false],
          [false, false, false, false, false, false, true],
          [false, false, false, false, true, true, false],
          [false, false, false, false, false, false, true],
          [true, true, true, true, true, true, false],
        ];
      case "X":
        return [
          [true, false, false, false, false, false, true],
          [false, true, true, false, true, true, false],
          [false, false, false, true, false, false, false],
          [false, true, true, false, true, true, false],
          [true, false, false, false, false, false, true],
        ];
      case "Y":
        return [
          [true, false, false, false, false, false, false],
          [false, true, false, false, false, false, false],
          [false, false, true, true, true, true, true],
          [false, true, false, false, false, false, false],
          [true, false, false, false, false, false, false],
        ];
      case "Z":
        return [
          [true, false, false, false, false, true, true],
          [true, false, false, false, true, false, true],
          [true, false, false, true, false, false, true],
          [true, false, true, false, false, false, true],
          [true, true, false, false, false, false, true],
        ];
      case " ":
        return [
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
        ];
      case ":":
        return [
          [false, false, false, false, false, false, false],
          [false, true, false, false, false, true, false],
          [false, false, false, false, false, false, false],
        ];

      case "%":
        return [
          [true, true, false, false, false, true, true],
          [false, false, false, false, true, false, false],
          [false, false, false, true, false, false, false],
          [false, false, true, false, false, false, false],
          [true, true, false, false, false, true, true],
        ];
      case "0":
        return [
          [false, true, true, true, true, true, false],
          [true, true, false, false, false, false, true],
          [true, false, true, true, true, false, true],
          [true, false, false, false, false, true, true],
          [false, true, true, true, true, true, false],
        ];

      case "1":
        return [
          [false, false, false, false, false, false, false],
          [false, true, false, false, false, false, true],
          [true, true, true, true, true, true, true],
          [false, false, false, false, false, false, true],
          [false, false, false, false, false, false, false],
        ];

      case "2":
        return [
          [false, true, false, false, true, true, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, true, false, false, false, true],
        ];

      case "3":
        return [
          [false, true, false, false, false, true, false],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, true, false, true, true, false],
        ];

      case "4":
        return [
          [true, true, true, true, false, false, false],
          [false, false, false, true, false, false, false],
          [false, false, false, true, false, false, false],
          [false, false, false, true, false, false, false],
          [true, true, true, true, true, true, true],
        ];

      case "5":
        return [
          [true, true, true, false, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, false, true, true, false],
        ];

      case "6":
        return [
          [false, true, true, true, true, true, false],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, false, false, true, true, false],
        ];

      case "7":
        return [
          [true, false, false, false, false, false, false],
          [true, false, false, false, true, true, true],
          [true, false, false, true, false, false, false],
          [true, false, true, false, false, false, false],
          [true, true, false, false, false, false, false],
        ];

      case "8":
        return [
          [false, true, true, false, true, true, false],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, true, false, true, true, false],
        ];

      case "9":
        return [
          [false, true, true, false, false, true, false],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [true, false, false, true, false, false, true],
          [false, true, true, true, true, true, false],
        ];

      default:
        return [[false, false, false, false, false, false, false]];
    }
  };

  // Convert text to LED matrix
  const textToLED = (
    text: string
  ): { matrix: boolean[][][]; totalWidth: number } => {
    const message: boolean[][][] = [];
    let totalWidth = 0;
    text = text.toUpperCase();

    for (let i = 0; i < text.length; i++) {
      message.push(charToLED(text.charAt(i)));
      totalWidth += charWidth;

      // Add spacing columns between characters (but not after the last character)
      if (i < text.length - 1) {
        for (let j = 0; j < charSpacing; j++) {
          message.push(charToLED()); // This returns the default case: [[false, false, false, false, false, false, false]]
          totalWidth += 1;
        }
      }
    }

    return { matrix: message, totalWidth };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const messageData = textToLED(text);
    const message = messageData.matrix;
    let offsetX = width;
    let lastTime = 0;
    const interval = 1000 / fps;

    function draw(timestamp: number) {
      if (timestamp - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // Calculate grid dimensions
      const gridWidth = Math.floor(width / (dotSize + dotSpacing));
      const gridHeight = Math.floor(height / (dotSize + dotSpacing));

      // Draw background "off" dots
      for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
          const x = col * (dotSize + dotSpacing) + dotSize / 2;
          const y = row * (dotSize + dotSpacing) + dotSize / 2;

          ctx.beginPath();
          ctx.fillStyle = offColor;
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw text
      let currentX = Math.floor(offsetX / (dotSize + dotSpacing));
      let messageIndex = 0;

      while (messageIndex < message.length && currentX < gridWidth) {
        const char = message[messageIndex];
        const currentCharWidth = char.length > 1 ? charWidth : 1; // 5 for actual chars, 1 for spacing columns

        for (let col = 0; col < currentCharWidth; col++) {
          const screenCol = currentX + col;

          if (screenCol >= 0 && screenCol < gridWidth) {
            for (let row = 0; row < Math.min(charHeight, gridHeight); row++) {
              if (char[col] && char[col][row]) {
                const x = screenCol * (dotSize + dotSpacing) + dotSize / 2;
                const y = row * (dotSize + dotSpacing) + dotSize / 2;

                ctx.beginPath();

                if (glow) {
                  ctx.shadowBlur = dotSize * 2;
                  ctx.shadowColor = color;
                } else {
                  ctx.shadowBlur = 0;
                }

                ctx.fillStyle = color;
                ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
              }
            }
          }
        }

        currentX += currentCharWidth;
        messageIndex++;
      }

      offsetX -= step;
      const totalMessageWidth = messageData.totalWidth * (dotSize + dotSpacing);

      if (offsetX < -totalMessageWidth) {
        offsetX = width;
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }, [
    text,
    width,
    height,
    dotSize,
    dotSpacing,
    step,
    fps,
    color,
    glow,
    offColor,
    charSpacing,
  ]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default LedTickerCustomFont;
