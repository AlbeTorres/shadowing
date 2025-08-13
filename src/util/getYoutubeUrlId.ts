export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Caso 1: URL estándar
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    // Caso 2: URL corta (youtu.be)
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}
