##############################################################################
#
##############################################################################

@CLASS
ApiController

@USE
json_api/controller.p

@OPTIONS
locals

@BASE
JsonApiController



##############################################################################
# Определяем пользовательские права
##############################################################################
@define_user_rights[]
    $self.rights[$RIGHTS]
#end @define_user_rights[]