export default function Home() {
  return (
    <div className="min-h-screen bg-bgSecondary flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Test Block 1: Typography */}
        <div className="space-y-4">
          <h1 className="text-h3 md:text-h1 text-foreground">
            NJ Bath Redesign
          </h1>
          <p className="text-body text-textMuted">
            Testing environment configured with light themes, absolute pixel typography, and Plus Jakarta Sans.
          </p>
        </div>

        {/* Test Block 2: Brand Colors & Responsive Flex Layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="px-6 py-3 bg-brandHighlight text-white rounded-md shadow-md text-body font-medium">
            Brand Highlight
          </div>
          <div className="px-6 py-3 bg-brandAccent text-white rounded-md shadow-md text-body font-medium">
            Brand Accent
          </div>
          <div className="px-6 py-3 bg-chromeMetal text-foreground rounded-md shadow-md text-body font-medium">
            Chrome Finish
          </div>
        </div>

        {/* Test Block 3: Prismoglass Card */}
        <div className="prismoglass-card p-8 rounded-2xl max-w-lg mx-auto text-left space-y-4">
          <h2 className="text-h4 md:text-h2 text-foreground">
            Prismoglass Card
          </h2>
          <p className="text-body text-textMuted">
            This card is rendered using CSS backdrop filters. Check to see if you can see through it over the soft gray background container.
          </p>
        </div>

      </div>
    </div>
  );
}