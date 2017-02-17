import os from 'os'
import HappyPack from 'happypack'

const threadPool = HappyPack.ThreadPool({ size: Math.ceil(os.cpus().length / 2) })
const { env } = process
const tempDir = `.happypack/${env.NODE_ENV || 'env'}`

/**
 * Returns a shareable Happypack plugin, which can be used for dev
 * and prod environments.
 * It handles thread pool, temporary directory, caching options out of the box.
 * 
 * Special environment variables are supported, as follows:
 * - *NODE_ENV*
 *   Used to define the temporary cache directory
 * - *HAPPY_CACHE*
 *   Whether to enable Happypack's cache or not.
 * - *HAPPY_VERBOSE*
 *   Should
 *
 * @param {string} id - A unique id for this happy plugin and is used by the loader to know which plugin it's supposed to talk to.
 * @param {Array.<String|Object{path: String, query: String}>} loaders - Each loader entry consists of the name or path of loader that would transform the files and an optional query string to pass to it.
 * @returns {HappypackPlugin}
 */
const getHappyPlugin = (id, loaders) => (new HappyPack({
  id,
  tempDir,
  loaders,
  threadPool,

  // disable happy caching with HAPPY_CACHE=0
  cache: env.HAPPY_CACHE !== '0',

  // make happy more verbose with HAPPY_VERBOSE=1
  verbose: env.HAPPY_VERBOSE === '1',
}))

export default getHappyPlugin
