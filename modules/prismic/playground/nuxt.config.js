import { defineNuxtConfig } from 'nuxt/config'
import routes from "../../../configs/prismic/routes"

/**
 * Environment informations
 */
const ENVIRONMENT = process.env.ENV || 'dev'
const IS_PREPROD = ENVIRONMENT === 'preprod'

export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/prismic'],
  prismic: {
    endpoint: 'https://nuxt-3-templates.cdn.prismic.io/api/v2',
    toolbar: IS_PREPROD,
    preview: IS_PREPROD ? '/preview/' : false,
    clientConfig: {
      routes
    }
  }
})