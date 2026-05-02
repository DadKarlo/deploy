import { Helmet } from 'react-helmet'

export default function HelmetR({ title, description, image, url }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />

			{/* Open Graph для соцсетей */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={url} />
			<meta property="og:type" content="article" />

			{/* Twitter Card */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			{/* Канонический URL */}
			<link rel="canonical" href={url} />
		</Helmet>
	)
}
