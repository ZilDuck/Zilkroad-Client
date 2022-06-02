<script>
  import ShapeImage from '$components/ShapeImage.svelte'
  import Header from '$components/Header.svelte'
  import JoinDiscord from '$components/JoinDiscord.svelte'
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:mt-40 mx-5 mb-[120px] max-w-screen-xl md:mx-auto">
  <h1 class="text-5xl leading-[1.25] md:text-[80px] font-medium max-w-3xl md:leading-[1.25]">Privacy policy</h1>
</div>

<main class="space-y-28 mx-5">
  <div class="max-w-screen-xl md:mx-auto">
    <div class="generic max-w-[840px]">
      <p>
        At Zilkroad, accessible from https://zilkroad.io, one of our main priorities is the privacy of our visitors.
        This Privacy Policy document contains types of information that is collected and recorded by Zilkroad and how we
        use it.
      </p>

      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to
        contact us. Our Privacy Policy was generated with the help of <a href="https://www.gdprprivacynotice.com/"
          >GDPR Privacy Policy Generator from GDPRPrivacyNotice.com</a
        >
      </p>

      <h2>General Data Protection Regulation (GDPR)</h2>
      <p>We are a Data Controller of your information.</p>

      <p>
        Zilkroad legal basis for collecting and using the personal information described in this Privacy Policy depends
        on the Personal Information we collect and the specific context in which we collect the information:
      </p>
      <ul>
        <li>Zilkroad needs to perform a contract with you</li>
        <li>You have given Zilkroad permission to do so</li>
        <li>Processing your personal information is in Zilkroad legitimate interests</li>
        <li>Zilkroad needs to comply with the law</li>
      </ul>

      <p>
        Zilkroad will retain your personal information only for as long as is necessary for the purposes set out in this
        Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
        obligations, resolve disputes, and enforce our policies.
      </p>

      <p>
        If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish
        to be informed what Personal Information we hold about you and if you want it to be removed from our systems,
        please contact us.
      </p>
      <p>In certain circumstances, you have the following data protection rights:</p>
      <ul>
        <li>The right to access, update or to delete the information we have on you.</li>
        <li>The right of rectification.</li>
        <li>The right to object.</li>
        <li>The right of restriction.</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent</li>
      </ul>

      <h2>Log Files</h2>

      <p>
        Zilkroad follows a standard procedure of using log files. These files log visitors when they visit websites. All
        hosting companies do this and a part of hosting services' analytics. The information collected by log files
        include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
        referring/exit pages, and possibly the number of clicks. These are not linked to any information that is
        personally identifiable. The purpose of the information is for analyzing trends, administering the site,
        tracking users' movement on the website, and gathering demographic information.
      </p>

      <h2>Privacy Policies</h2>

      <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Zilkroad.</p>

      <p>
        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used
        in their respective advertisements and links that appear on Zilkroad, which are sent directly to users' browser.
        They automatically receive your IP address when this occurs. These technologies are used to measure the
        effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on
        websites that you visit.
      </p>

      <p>Note that Zilkroad has no access to or control over these cookies that are used by third-party advertisers.</p>

      <h2>Third Party Privacy Policies</h2>

      <p>
        Zilkroad's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult
        the respective Privacy Policies of these third-party ad servers for more detailed information. It may include
        their practices and instructions about how to opt-out of certain options.
      </p>

      <p>
        You can choose to disable cookies through your individual browser options. To know more detailed information
        about cookie management with specific web browsers, it can be found at the browsers' respective websites.
      </p>

      <h2>Children's Information</h2>

      <p>
        Another part of our priority is adding protection for children while using the internet. We encourage parents
        and guardians to observe, participate in, and/or monitor and guide their online activity.
      </p>

      <p>
        Zilkroad does not knowingly collect any Personal Identifiable Information from children under the age of 13. If
        you think that your child provided this kind of information on our website, we strongly encourage you to contact
        us immediately and we will do our best efforts to promptly remove such information from our records.
      </p>

      <h2>Online Privacy Policy Only</h2>

      <p>
        Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
        to the information that they shared and/or collect in Zilkroad. This policy is not applicable to any information
        collected offline or via channels other than this website.
      </p>

      <h2>Consent</h2>

      <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
    </div>
  </div>
  <JoinDiscord className="mx-auto max-w-screen-xl" />
</main>

<style>
  .generic p {
    margin-bottom: 20px;
  }
  .generic h2 {
    @apply text-2xl font-semibold mb-5 mt-10;
  }

  .generic ul {
    @apply mb-5 list-disc list-inside;
  }
</style>
