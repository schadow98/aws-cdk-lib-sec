# aws-cdk-lib-sec
 A security as code solution for aws-cdk-lib


#.github/workflows/deploy.yml
name: deploy
run-name: deploy
        
jobs:
  SecDeploy:
    runs-on: ubuntu-latest
    steps:

      - name: Checkout
        uses: actions/checkout@v4

      - name: aws-cdk-lib-sec
        uses: schadow98/aws-cdk-lib-sec@main  

      - name: Upload logs
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: SecurityRepoert
          path: logs