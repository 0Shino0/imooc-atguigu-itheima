export default (dir) => () => import('@' + dir + '.vue')
