import type { QuizAnswer } from '../types/quiz';

export function encodeQuizAnswers(answers: QuizAnswer[]): string {
  // Create a compact representation of answers
  const answerString = answers
    .map((a) => `${a.questionId}:${a.value}`)
    .join('|');

  // Base64 encode for URL safety
  return btoa(answerString);
}

export function decodeQuizAnswers(encoded: string): QuizAnswer[] | null {
  try {
    // Decode from base64
    const answerString = atob(encoded);

    // Parse the answer string
    const answers = answerString.split('|').map((pair) => {
      const [questionId, value] = pair.split(':');
      return {
        questionId,
        value: isNaN(Number(value)) ? value : Number(value),
      };
    });

    return answers;
  } catch (error) {
    console.error('Failed to decode quiz answers:', error);
    return null;
  }
}

export function createShareableUrl(answers: QuizAnswer[]): string {
  const encoded = encodeQuizAnswers(answers);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?quiz=${encoded}`;
}

export function getQuizAnswersFromUrl(): QuizAnswer[] | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('quiz');

  if (!encoded) {
    return null;
  }

  return decodeQuizAnswers(encoded);
}
