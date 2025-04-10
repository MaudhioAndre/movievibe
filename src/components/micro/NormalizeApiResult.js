export default function NormalizeApiResult(result) {
  if (Array.isArray(result)) return result
  if (Array.isArray(result.results)) return result.results
  return []
}
