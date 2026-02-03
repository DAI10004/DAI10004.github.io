---
title: "Next.js 静态站点生成（SSG）详解"
date: "2026-02-01"
description: "深入理解 Next.js 的静态站点生成原理和使用方法。"
---

# Next.js 静态站点生成（SSG）详解

静态站点生成（Static Site Generation, SSG）是 Next.js 最重要的特性之一。

## 什么是 SSG？

SSG 在**构建时**（build time）生成 HTML 页面，而不是在每次请求时生成。这意味着：

- 页面在部署时就已经生成好
- 用户请求时直接返回静态 HTML
- 无需服务器端运行时

## SSG 的优势

### 1. 性能优秀
- 静态 HTML 可以被 CDN 缓存
- 首屏加载速度极快
- SEO 友好

### 2. 稳定性高
- 无需数据库
- 无需后端服务器
- 减少故障点

### 3. 成本低
- 可以使用 GitHub Pages 等免费托管
- 无需运行服务器

## Next.js 中的 SSG 实现

### 基本用法

```typescript
export default function Page({ data }) {
  return <div>{data}</div>
}

// 在构建时获取数据
export async function getStaticProps() {
  const data = await fetchData()
  return {
    props: { data }
  }
}
```

### 动态路由

```typescript
// pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug)
  return {
    props: { post }
  }
}
```

## 何时使用 SSG？

**适合 SSG 的场景：**

- 营销页面
- 文档网站
- 博客
- 产品展示页
- 内容更新不频繁的网站

**不适合 SSG 的场景：**

- 需要用户登录的内容
- 实时数据
- 用户个性化内容
- 频繁更新的内容

## 本博客的架构

本博客采用典型的 SSG 架构：

```
Markdown 文件
    ↓
构建时读取并解析
    ↓
生成静态 HTML
    ↓
部署到 GitHub Pages
```

## 总结

SSG 是构建现代静态网站的理想选择，结合了性能、SEO 和开发效率。

如果你的内容在构建时就能确定，SSG 是最佳选择。
