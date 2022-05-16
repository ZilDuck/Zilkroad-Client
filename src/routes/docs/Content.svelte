<div class="space-y-5">
  <slot />
</div>

<style>
  :global(.docs-layout h1),
  :global(.docs-layout h2),
  :global(.docs-layout h3),
  :global(.docs-layout h4),
  :global(.docs-layout h5),
  :global(.docs-layout h6) {
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 0;
    line-height: 1.25;
  }

  :global(.docs-layout p) {
    margin-bottom: 20px;
    color: #cbcbcb;
    line-height: 1.5;
  }

  :global(.docs-layout img) {
    border-radius: 8px;
    margin-bottom: 20px;
  }

  :global(.docs-layout h1) {
    font-size: 64px;
  }

  :global(.docs-layout h2) {
    font-size: 48px;
  }

  :global(.docs-layout h3) {
    font-size: 36px;
  }

  :global(.docs-layout h4) {
    font-size: 24px;
  }

  :global(.docs-layout h5) {
    font-size: 20px;
  }

  :global(.docs-layout h6) {
    font-size: 16px;
  }
</style>
