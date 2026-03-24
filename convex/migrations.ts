import { mutation } from "./_generated/server"

export const seedImages = mutation({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect()
    
    for (const product of products) {
      let imagePath = ""
      if (product.name.includes("TRANSCEIVER")) {
        imagePath = "/hardware/transceiver.png"
      } else if (product.name.includes("EDGE SERVER")) {
        imagePath = "/hardware/server.png"
      } else if (product.name.includes("FIBER OPTIC")) {
        imagePath = "/hardware/node.png"
      } else if (product.name.includes("POWER UNIT")) {
        imagePath = "/hardware/power.png"
      }
      
      if (imagePath) {
        await ctx.db.patch(product._id, {
          images: [imagePath]
        })
      }
    }
  }
})
