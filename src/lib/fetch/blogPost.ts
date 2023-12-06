import CONSTANTS from '@constants'

export async function fetchBlogPostByYear(year: number) {
  try {
    const res = await fetch(`${CONSTANTS.API_BLOG}?year=${year}`)
    const jsonRes = await res.json()

    if (jsonRes.error) {
      throw new Error(jsonRes.error)
    }

    return jsonRes
  } catch (error) {
    console.error(error)
  }
}
