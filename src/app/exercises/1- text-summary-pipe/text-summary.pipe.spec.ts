import { TextSummaryPipe } from './text-summary.pipe';

describe('TextSummaryPipe', () => {
  let pipe: TextSummaryPipe;

  beforeEach(() => {
    pipe = new TextSummaryPipe();
  });

  it('should return an empty string if input is null', () => {
    expect(pipe.transform(null)).toEqual('');
  });
  it('should return null if input is undefined', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });
  it('should return empty string if input is an empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });
  it('should return same value if the limit is equal or greater than the value', () => {
    expect(pipe.transform('11111', 5)).toEqual('11111');
  });
  it('should shorten the input if it is longer than the limit', () => {
    expect(pipe.transform('123456789', 5)).toEqual('12345...');
  });
  it('should assume 10 as the limit if not given', () => {
    expect(pipe.transform('1234567891011')).toEqual('1234567891...');
  });
});
