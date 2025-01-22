export const fetchMap = {
  /**
   * octcat
   *
   * octocat 是 GitHub 的官方示例用户账号
   * 返回该用户的公开信息，包括：用户名、头像 URL、个人简介、关注者数量、仓库数量
   *
   * 这个 API 端点经常被用作测试和学习 API 调用的示例，因为它：
   * 不需要认证
   * 返回结构清晰的数据
   *
   * 这个接口做了限流
   */
  // octocat: 'https://api.github.com/users/octocat',

  /**
   * JSONPlaceholder 示例数据
   *
   * JSONPlaceholder 是一个免费的在线 REST API,提供测试和原型开发用的假数据
   * 返回10条模拟的博客文章数据,包含:
   * - userId: 用户ID
   * - id: 文章ID
   * - title: 文章标题
   * - body: 文章内容
   */
  data_10: 'https://jsonplaceholder.typicode.com/posts',

  /**
   * Random User Generator
   *
   * 随机用户生成器API,返回随机的用户信息,包含:
   * - 姓名
   * - 邮箱
   * - 头像
   * - 地址等个人信息
   */
  random_user: 'https://randomuser.me/api/',

  /**
   * Dog API
   *
   * 返回随机的狗狗图片URL
   * 简单有趣,非常适合测试图片加载
   */
  random_dog: 'https://dog.ceo/api/breeds/image/random',
}
