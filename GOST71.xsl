<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:b="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" b:schemaLocation="http://schemas.openxmlformats.org/officeDocument/2006/bibliography shared-bibliography.xsd">
    <xsl:output method="html" encoding="utf-8" />
    <xsl:template match="/">
        <xsl:call-template name="Start" />
    </xsl:template>
    <xsl:template name="Start">
        <xsl:choose>
            <xsl:when test="b:Version">
                <xsl:text>2020.02.03</xsl:text>
            </xsl:when>
            <xsl:when test="b:XslVersion">
                <xsl:text>2003</xsl:text>
            </xsl:when>
            <xsl:when test="b:OfficeStyleKey">
                <xsl:text>GOST71</xsl:text>
            </xsl:when>
            <xsl:when test="b:StyleNameLocalized">
                <xsl:choose>
                    <xsl:when test="b:StyleNameLocalized/b:Lcid='1049'">
                      <xsl:text>ГОСТ 7.1 — в порядке упоминания</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>GOST 7.1 - in order of appearance</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
            </xsl:when>
            <xsl:when test="b:GetImportantFields">
                <xsl:call-template name="ImportantFields" />
            </xsl:when>
            <xsl:when test="b:Bibliography">
                <xsl:call-template name="Bibliography" />
            </xsl:when>
            <xsl:when test="b:Citation">
                <xsl:call-template name="Citation" />
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="ImportantFields">
        <b:ImportantFields>
            <xsl:choose>
                <xsl:when test="b:GetImportantFields/b:SourceType = 'Book'">
                    <b:ImportantField>
                        <xsl:text>b:Author/b:Author/b:NameList</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:Title</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:SubTitle</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:Year</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:City</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:Edition</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:Series</xsl:text>
                    </b:ImportantField>
                    <b:ImportantField>
                        <xsl:text>b:Volume</xsl:text>
                    </b:ImportantField>
                </xsl:when>
            </xsl:choose>
        </b:ImportantFields>
    </xsl:template>

    <xsl:template name="RefOrder">
        <xsl:value-of select="b:Source/b:RefOrder" />
    </xsl:template>

    <xsl:template name="Citation">
        <xsl:for-each select="b:Citation">
            <xsl:variable name="cPages">
                <xsl:value-of select="count(b:Pages)" />
            </xsl:variable>
            <xsl:variable name="pages">
                <xsl:value-of select="concat('с. ', b:Pages)" />
            </xsl:variable>
            <html xmlns="http://www.w3.org/TR/REC-html40">
                <body>
                    <xsl:if test="b:FirstAuthor">
                        <xsl:text>[</xsl:text>
                    </xsl:if>
                    <xsl:call-template name="RefOrder" />
                    <xsl:if test="count(b:Pages) > 0">
                        <xsl:value-of select="concat(', с. ', b:Pages)" />
                    </xsl:if>
                    <xsl:if test="b:LastAuthor">
                        <xsl:text>]</xsl:text>
                    </xsl:if>
                    <xsl:if test="not(b:LastAuthor)">
                        <xsl:text>; </xsl:text>
                    </xsl:if>
                </body>
            </html>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="b:Source">
        <xsl:element name="p">
            <xsl:attribute name="class">
                <xsl:value-of select="'MsoBibliography'" />
            </xsl:attribute>
            <xsl:attribute name="style">
                <xsl:value-of select="'margin:0cm;line-height:150%;text-indent:35.45pt'" />
            </xsl:attribute>
            <xsl:element name="span">
                <xsl:value-of select="b:RefOrder" />
            </xsl:element>
            <xsl:choose>
                <xsl:when test="b:RefOrder &gt; 9">
                    <xsl:text>&#160;&#160;&#160;</xsl:text>
                </xsl:when>
                <xsl:when test="b:RefOrder &gt; 99">
                    <xsl:text>&#160;</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>&#160;&#160;&#160;&#160;&#160;</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:element name="span">
                <xsl:value-of select="b:Title" />
            </xsl:element>
        </xsl:element>
    </xsl:template>

    <xsl:template name="Bibliography">
        <html xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <style>p.MsoBibliography</style>
            </head>
            <xsl:text>&#10;</xsl:text>
            <body>
                <xsl:text>&#10;</xsl:text>
                <xsl:for-each select="b:Bibliography">
                    <xsl:apply-templates select="b:Source">
                        <xsl:sort select="b:RefOrder" order="ascending" data-type="number" />
                    </xsl:apply-templates>
                </xsl:for-each>
                <xsl:text>&#10;</xsl:text>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="text()" />

</xsl:stylesheet>