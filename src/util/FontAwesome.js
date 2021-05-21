import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

// Puts together our library of fonts. This gets included in index.js so that it is available globally
library.add(
    faGoogle,
    faTwitter,
    faFacebook
)