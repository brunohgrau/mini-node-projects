import path from "path";
import { URL } from "url";
import slug from "slug";
import cheerio from "cheerio";

//  -----------------------------------------

// getLinkUrl: Extracts and normalizes the absolute URL from a given anchor element, considering the current page's URL for relative links.

// 1. Parse Link URL:

/* 1.1 const parsedLink = new URL(element.attribs.href || "", currentUrl);:
  1.1.1 Creates a new URL object from the href attribute of the provided element.
  1.1.2 Uses currentUrl as the base URL for relative links.
  1.1.3 Uses || "" to provide an empty string as a default if href is missing.*/

// 2. Parse Current URL:
/* const currentParsedUrl = new URL(currentUrl);:
  Creates a URL object representing the current page's URL.*/

// 3. Filter Links within Same Domain:

/* if (parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname { ... }:
  Checks if:
    The link's hostname (domain) matches the current page's hostname.
    The link has a valid pathname (path portion of the URL).
  Returns null if either condition fails, filtering out external links or invalid URLs.*/

// 4. Return Normalized URL:

/* return parsedLink.toString();:
  If the link passes the checks, returns the parsed link's absolute URL as a string.*/

function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || "", currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }
  return parsedLink.toString();
}

// -------------------------------------------------

// getPageLinks():  function extracts links from a given HTML page body.
// 1. Load HTML with Cheerio:
/* 1.1 cheerio.load(body)("a"): Loads the HTML content in body using Cheerio, a library for parsing and manipulating HTML.
  1.2 ("a"): Selects all anchor (<a>) elements within the loaded HTML, as these contain links. */

// 2.Extract Link URLs:

/* 2.1 Array.from(...).map(...): Converts the selected elements into an array and applies a mapping function to each element.
  2.2 getLinkUrl(currentUrl, element):   Extracts and normalizes the absolute URL from a given anchor element, considering the current page's URL for relative links.*/

// 3.Filter Valid Links:

/* .filter(Boolean): Removes any invalid or empty links from the array, keeping only those with valid URLs. */

// 4.Returns:

/* An array of absolute URLs: The function returns an array containing the extracted link URLs from the parsed HTML.*/

export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)("a"))
    .map(function (element) {
      return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
}

// ------------------------------------------------

// urlToFilename: This function converts a URL into a suitable filename. Here's a breakdown of what it does:

/* 1.Parse the URL:
  new URL(url): Creates a URL object from the provided url string.

  2.Extract and Clean Path:
  2.1 parsedUrl.pathname: Gets the path portion of the URL (e.g., /articles/my-post).
  2.2 split("/"): Splits the path into an array of path components (e.g., ["articles", "my-post"]).
  2.3 filter(...): Removes any empty components from the array.
  2.4 map(...): Applies the slug(component) function to each remaining component.

  3.Generate Slug for Each Path Component:
  3.1 slug(component): This function (likely not shown) replaces non-alphanumeric characters with hyphens and converts characters to lowercase. This creates a clean and human-readable filename component.

  4.Compose Filename:
  4.1 path.join(parsedUrl.hostname, urlPath): Joins the host (e.g., website.com) with the cleaned path, forming the base filename.

  5.Add ".html" if Missing:
  5.1 path.extname(filename): Checks if the filename has an extension.
  5.2 match(/htm/): Checks if the extension matches any variation of "htm".
  5.3 filename += ".html": Adds ".html" if no HTML extension is found.

  6.Return Final Filename: The function returns the final filename string, which represents a cleaned and HTML-compatible version of the original URL.


*/

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split("/")
    .filter(function (component) {
      return component !== "";
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    .join("/");
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += ".html";
  }

  return filename;
}
