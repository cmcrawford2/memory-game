# Contributors Guide

Welcome to the Memory Game contributors guide.

## Getting Started

Before you begin:

- Read the [Code of Conduct](https://github.com/cmcrawford2/memory-game/COC.md/)
- Check out [existing issues](https://github.com/cmcrawford2/memory-game/issues)

If you're looking to start learning how to work with this repo, this document tries to provide all the resources to get you from confusion to productivity.

Most of the documentation is currently written using [markdown](https://www.markdownguide.org/basic-syntax/) to make it easy to add, modify, and edit what we need to.

## What Type of Contributions We're Looking For

This is an open source project, and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests, or writing code which can be incorporated into the application codebase itself.

## The Basics

### Setting Up A GitHub Account

We're going to assume you know what [GitHub](https://www.howtogeek.com/180167/htg-explains-what-is-github-and-what-do-geeks-use-it-for/) is (otherwise, how would you be reading this?).

If you haven't made a GitHub account as yet, [make one now](https://github.com). It's free!

### Working With Issues

GitHub uses a feature called _issues_. Issues are essentially a way to highlight bugs, features, problems, or any sort of suggestion or action you wish to happen on a GitHub hosted project (you can find a more comprehensive explanation [here](https://guides.github.com/features/issues/)).

We recommend looking at the existing repository issues to find a good open issue to start with. There are two beginner friendly issues that are straightforward, and one issue that is more complex.

If you find an issue you would like to work on, comment on the issue and a maintainer will respond and/or assign it to you. It can't be assigned to you unless you've commented on the issue.

We also use a `PR Submitted` tag to indicate when a pull request has been submitted for an issue, but it hasn't yet been merged, as most people would rather do on an issue with no attempted pull request yet.

If you feel like there's a contribution you would like to make that isn't represented by an already existing issue, feel free to create your own!

### Setting Up Local Environment To Work On Issues

> ⚠️ **Heads up!** If you'd like to work on issues, please make sure you **create a new branch and work in this branch** to avoid pushing your changes directly into the `main` branch.

- Follow the steps for local development [in our README](README.md#local-development).
- Create a new branch by typing this command on the terminal:

  ```bash
  git checkout -b branch-name
  ```

  Change the `branch-name` to whatever you want. For example:

  ```bash
  git checkout -b alice-add-footer
  ```

### Creating A Pull Request

If you'd like to make a pull request, please make sure you've created an issue (or a discussion board post) first, and **that you've been assigned to the issue,** unless your change is very minor such as fixing a typo. This allows the maintainer team to provide guidance and prioritize tasks — otherwise you may run the risk of spending time on something that doesn't end up getting accepted for various reasons.

Once you've been assigned the issue, you have two options.

**The first option** is using the GitHub interface to fork the repo, making an edit right here in the GitHub client, and then submit a pull request (no code or terminals or IDE required). [This guide](https://guides.github.com/activities/hello-world/) shows just how to do that for a small personal repo. You would simply replace the step of creating a new repository to just navigating to this one and forking that instead. This is a great idea if you simply plan to add to or edit one of the markdown files we use for documentation in this project.

**The second option** is go the traditional route of forking the repo, creating a local copy of that fork, and working on your changes that way. This is also the only way to go if this project expands to include an associated application. For that we recommend [this guide](https://www.dataschool.io/how-to-contribute-on-github/).

**Note:** The guide referenced above uses _master_ as the naming convention for the default branch in all its repos. In this project, _main_ is the default branch name. When following the instructions in the guide, simply replace _master_ with _main_ wherever it appears and it should proceed as normal. [This guide from Scott Hanselman](https://www.hanselman.com/blog/EasilyRenameYourGitDefaultBranchFromMasterToMain.aspx) can help you transition with your own personal repos from master to main, and explains the methodology as to why you should.

### Awaiting Review

Once you've submitted your pull request, the only thing left is to wait from feedback from one of the project maintainers. Since this is volunteer work for all, of course, we ask for your patience if you don't see a response immediately. It can take time for someone's schedule to clear up to have the right conditions to properly review incoming pull requests. We'd rather not rush a response after someone has put time and effort into submitting it. If it's been over **one week** and you haven't received any acknowledgement, you can post a comment on your pull request reminding of its status.

The purpose of reviews is to create the best experience we can for our contributors.

- Reviews are always respectful, acknowledging that everyone did the best possible job with the knowledge they had at the time.
- Reviews discuss content, not the person who created it.
- Reviews are constructive and start conversation around feedback.

If the pull request looks good, a maintainer will typically give feedback and merge the request immediately, otherwise they'll let you know what questions they have or what needs to change before your work can be accepted. Once it is, you'll see your changes on the main branch and VOILA, open source contribution complete!

### Suggested Changes

We may ask for changes to be made before a pull request can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.

As you update your pull request and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).

### Tips and Gotchas

This section is just little notes and bits of info that can smooth over some of the bumps and hiccups that can come along with contributing.

- While this isn't absolutely required, we highly recommend **associating your pull requests with the issue that they're intended to address**. This makes review much easier and avoids confusion when looking back at past commits. GitHub allows you to link a pull request to an issue, both during and after the pull request's creation (the option should be located in rightmost panel of the GitHub pull request interface).
- **Please do not hesitate to ask for help** in any part of this process if you feel confused. As soon as they can, project maintainers can try and get you through the parts which are confusing you. Just be aware that no one here is a GitHub expert :). We're just folks happy and willing to help others get some experience.
- Be extra careful when working with git in the command line. Incorrectly typed names or commands can have strange results, and navigating git issues can be very perplexing. Fortunately, there's a plethora of resources on fixing said issues, and rest assured that any error you make has already been done, and solved, by someone.

That's all for now. If you feel like anything is missing from this document that you wish were included, let us know. Or hey, open up a fresh issue and take a shot at helping us make it better!
