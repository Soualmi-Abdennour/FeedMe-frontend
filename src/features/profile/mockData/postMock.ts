// import { PostDbModel } from "@/features/studio-and-publication/types/studio.types";

// export const MOCK_POSTS_DB: PostDbModel[] = [
//   {
//     id: "post_001",
//     title: "Classic Margherita Pizza",
//     description: "The secret is in the 48-hour fermented dough.",
//     video: null,
//     contentType: "DISH",
//     mediaType: "IMAGE",
//     isPinned: true,
//     likeCount: 154,
//     commentCount: 12,
//     userId: "res_abc_123",
//     createdAt: new Date("2026-04-20T10:00:00Z"),
//     updatedAt: new Date("2026-04-20T10:00:00Z"),
//     media: [
//       {
//         id: "m_001",
//         url: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800",
//         order: 1,
//         postId: "post_001",
//         type:"IMAGE",
//         createdAt:new Date("2026-04-20T10:00:00Z"),
//         updatedAt:new Date("2026-04-20T10:00:00Z"),

//       }
//     ]
//   },
//   {
//     id: "post_002",
//     title: "How to make Gnocchi",
//     description: "Step-by-step guide to perfect potato gnocchi.",
//     video: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-delicious-plate-of-pasta-40672-large.mp4",
//     contentType: "RECIPE",
//     mediaType: "VIDEO",
//     isPinned: false,
//     likeCount: 320,
//     commentCount: 45,
//     userId: "res_abc_123",
//     createdAt: new Date("2026-04-25T14:30:00Z"),
//     updatedAt: new Date("2026-04-25T14:30:00Z"),
//     media: [] // Video URL is stored in the 'video' field per your model
//   },
//   {
//     id: "post_003",
//     title: "Our New Summer Menu",
//     description: "Check out our latest seasonal additions.",
//     video: null,
//     contentType: "DISH",
//     mediaType: "MULTI_IMAGE",
//     isPinned: false,
//     likeCount: 88,
//     commentCount: 5,
//     userId: "res_abc_123",
//     createdAt: new Date("2026-04-29T18:00:00Z"),
//     updatedAt: new Date("2026-04-29T18:00:00Z"),
//     media: [
//       {
//         id: "m_002",
//         url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
//         order: 1,
//         postId: "post_003",
//         type:"VIDEO",
//         createdAt:new Date("2026-04-20T10:00:00Z"),
//         updatedAt:new Date("2026-04-20T10:00:00Z"),
//       },
//       {
//         id: "m_003",
//         url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
//         order: 2,
//         postId: "post_003",
//         type:"IMAGE",
//         createdAt:new Date("2026-04-20T10:00:00Z"),
//         updatedAt:new Date("2026-04-20T10:00:00Z"),
//       }
//     ]
//   }
// ];