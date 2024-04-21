import { expect, describe, it } from 'vitest';
import { getUrlVariations, urlMatches } from './url';
import { DomainProps } from '@/utils/storage';

describe('getUrlVariations', () => {
  it('should return an empty array if the URL is not provided or invalid', () => {
    // Test with undefined
    expect(getUrlVariations(undefined)).toEqual([]);

    // Test with an invalid URL
    expect(getUrlVariations('invalid-url')).toEqual([]);

    // Test with "about:blank"
    expect(getUrlVariations('about:blank')).toEqual([]);
  });

  it('should return an empty array if the URL is a chrome extension URL', () => {
    expect(getUrlVariations('chrome-extension://some-extension')).toEqual([]);
  });

  it('should return ["localhost"] for a localhost URL', () => {
    expect(getUrlVariations('http://localhost')).toEqual(['localhost']);
  });

  it('should return the expected variations for a simple domain URL with www', () => {
    const variations = getUrlVariations('http://www.example.com');
    expect(variations).toEqual(['*.example.com', 'example.com']);
  });

  it('should return the expected variations for a simple domain URL', () => {
    const variations = getUrlVariations('http://example.com');
    expect(variations).toEqual(['*.example.com', 'example.com']);
  });

  it('should return the expected variations for a subdomain URL', () => {
    const variations = getUrlVariations('http://sub.example.com');
    expect(variations).toEqual([ "*.example.com", "example.com", "*.sub.example.com", "sub.example.com"]);
  });

  it('should handle complex domains', () => {
    const variations = getUrlVariations('http://deep.sub.example.com');
    expect(variations).toEqual([ '*.example.com', 'example.com','*.sub.example.com', 'sub.example.com','*.deep.sub.example.com','deep.sub.example.com']);
  });
});

describe('urlMatches', () => {
  it('should return an empty array if no domains are provided', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://example.com',
        hostname: 'example.com',
      },
      writable: true,
    });

    expect(urlMatches([])).toEqual([]);
  });

  it('should return matching domains', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://example.com',
        hostname: 'example.com',
      },
      writable: true,
    });

    const domains: DomainProps[] = [
      { domain: '*.example.com', toggles: DEFAULT_TOGGLES },
      { domain: 'test.com', toggles: DEFAULT_TOGGLES },
      { domain: 'example.com', toggles: DEFAULT_TOGGLES },
    ];

    const result = urlMatches(domains);
    expect(result).toEqual([
      { domain: 'example.com', toggles: DEFAULT_TOGGLES },
    ]);
  });

  it('should handle subdomains', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://sub.example.com',
        hostname: 'sub.example.com',
      },
      writable: true,
    });

    const domains: DomainProps[] = [
      { domain: '*.example.com', toggles: DEFAULT_TOGGLES },
      { domain: 'test.com', toggles: DEFAULT_TOGGLES },
    ];

    const result = urlMatches(domains);
    expect(result).toEqual([{ domain: '*.example.com', toggles: DEFAULT_TOGGLES }]);
  });
});
