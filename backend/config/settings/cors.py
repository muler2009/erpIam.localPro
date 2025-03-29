from config.env import env

# list method used beacuse CORS_ORIGIN_WHITELIST is list of ip's
CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST", default=[])
